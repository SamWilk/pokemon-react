import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2217671962826733"
        crossOrigin="anonymous"
      ></script>
      {/* <!-- Ad-sidebar --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2217671962826733"
        data-ad-slot="6322845707"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  );
};

export default GoogleAd;
