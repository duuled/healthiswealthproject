const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_DOMAIN = 'healthiswealthstore-p8wk2.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '288b037ac1fdeab38210c7cd889f876c';

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: Array<{ node: { url: string; altText: string | null } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

async function storefrontRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`Shopify HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0]?.message || 'Shopify error');
  return data;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 3) { edges { node { url altText } } }
          variants(first: 5) {
            edges {
              node {
                id title availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export async function getProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontRequest(PRODUCTS_QUERY, { first, query });
  return (data?.data?.products?.edges ?? []).map((e: any) => e.node);
}

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) { edges { node { url altText } } }
      variants(first: 10) {
        edges {
          node {
            id title availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontRequest(PRODUCT_QUERY, { handle });
  return data?.data?.product ?? null;
}

export async function createCheckout(items: Array<{ variantId: string; quantity: number }>): Promise<string> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `;
  const data = await storefrontRequest(mutation, {
    input: { lines: items.map(i => ({ quantity: i.quantity, merchandiseId: i.variantId })) },
  });

  const { cart, userErrors } = data.data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart.checkoutUrl;
}
