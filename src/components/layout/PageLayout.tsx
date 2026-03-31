import Header from './Header';
import Container from './Container';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className='min-h-screen bg-neutral-900 flex flex-col'>
      <Header />

      <main id='main-content' className='flex-1 pb-12' role='main'>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
