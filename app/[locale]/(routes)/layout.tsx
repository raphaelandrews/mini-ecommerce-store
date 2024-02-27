import CategoriesList from '@/components/categories-list'
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <CategoriesList />
            {children}
            <Footer />
        </>
    );
};
