import faviconImage from "../../gallery/FAVICON.png";

export default function BrandMark({ size = 28 }) {
  return <img width={size} height={size} src={faviconImage} alt="" className="brand-mark" />;
}
