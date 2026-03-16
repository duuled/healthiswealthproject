import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { useOrders } from '@/hooks/useOrders';

export function Profile() {
  const { user, profile, signOut, updateProfile, isLoading } = useAuth();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { orders } = useOrders();

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [addressLine1, setAddressLine1] = useState(profile?.address_line1 ?? '');
  const [city, setCity] = useState(profile?.city ?? '');
  const [state, setState] = useState(profile?.state ?? '');
  const [zipCode, setZipCode] = useState(profile?.zip_code ?? '');
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading) return null;
  if (!user) return <Navigate to="/" replace />;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ full_name: fullName, phone, address_line1: addressLine1, city, state, zip_code: zipCode });
    } finally {
      setIsSaving(false);
    }
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">My Account</h1>
            <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <Heart className="w-4 h-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* ORDERS */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders yet.</p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Order #{order.shopify_order_number}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {order.total_price && (
                            <span className="text-sm font-semibold">
                              ${Number(order.total_price).toFixed(2)}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status] ?? 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* WISHLIST */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Items</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No saved items.</p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/shop">Browse Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_title}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.shopify_handle}`}
                            className="text-sm font-medium hover:underline line-clamp-2"
                          >
                            {item.product_title}
                          </Link>
                          {item.product_price && (
                            <p className="text-xs text-muted-foreground mt-1">{item.product_price}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                              <Link to={`/product/${item.shopify_handle}`}>
                                View <ChevronRight className="w-3 h-3 ml-1" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-destructive hover:text-destructive"
                              onClick={() => removeFromWishlist(item.shopify_product_id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile & Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={addressLine1}
                      onChange={e => setAddressLine1(e.target.value)}
                      placeholder="123 Wellness St"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Venice"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP</Label>
                      <Input
                        id="zip"
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}
                        placeholder="90291"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Saving…' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
