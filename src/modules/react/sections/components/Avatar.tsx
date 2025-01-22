import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@mm/components/ui/avatar";

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <AvatarUI className="w-8 h-8">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt.charAt(0)}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
