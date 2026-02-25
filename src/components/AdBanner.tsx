import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = () => {
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    if (!adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className="flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: 728, height: 90 }}
        data-ad-client="ca-pub-3545054129078649"
        data-ad-slot="5540247340"
      />
    </div>
  );
};

export default AdBanner;
