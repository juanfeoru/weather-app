import Header from './Header';
import Container from './Container';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className='min-h-screen bg-neutral-900'>
      <Header />

      <main className='flex-1'>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
