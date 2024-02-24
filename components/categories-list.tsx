import getCategories from "@/actions/get-categories";
import MainNav from "@/components/main-nav";
import Container from "./ui/container";
import getCountries from "@/actions/get-countries";

const CategoriesList = async () => {
    const categories = await getCategories();
    const countries = await getCountries();

    return (
        <Container>
            <MainNav categories={categories} countries={countries} />
        </Container>
    );
}

export default CategoriesList;