import { useQRCode } from 'next-qrcode';
    
export default function QRCodeGenerator({ url }) {
  const { Image } = useQRCode();

  return (
    <div>
      {url ? (
        <Image 
          text={url}
          options={{
            type: 'image/jpeg',
            quality: 1,
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#000',
              light: '#fff',
            },
          }}
        />
      ) : (
        <p>Please enter a URL</p>
      )}
    </div>
  );
}