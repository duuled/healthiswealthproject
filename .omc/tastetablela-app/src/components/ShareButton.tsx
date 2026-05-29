'use client';

interface ShareButtonProps {
  spotName: string;
  slug: string;
}

export default function ShareButton({ spotName, slug }: ShareButtonProps) {
  const url = `https://tastetablela.vercel.app/spots/${slug}`;

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: `${spotName} — TasteTable LA`,
          text: `Check out ${spotName} on TasteTable LA — real local spots, no tourists.`,
          url,
        })
        .catch(() => {
          navigator.clipboard?.writeText(url);
        });
    } else {
      navigator.clipboard?.writeText(url);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-[#FF4B2B] hover:bg-[#e63c20] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
    >
      Share this spot
    </button>
  );
}
