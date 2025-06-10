import AppWalletProvider from "./components/AppWalletProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{backgroundColor:'#090D14'}} className="h-full">
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}