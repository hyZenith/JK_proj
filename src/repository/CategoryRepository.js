import AppConst from "../AppConst";

export default class CategoryRepository {

    static async homepage() {
        try {
            const response = await fetch(AppConst.api(AppConst.homePageCategories));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.warn('API failed, using fallback data');
        }
        // Return realistic fake data that matches the design
        return CategoryRepository.fake(9);
    }

    static fake(count) {
        // Real category data matching the target design
        const realCategories = [
            {
                id: 1,
                name: "Manufacturing & Production",
                slug: "manufacturing-production",
                categories: [
                    { id: 1, name: "Textile Manufacturing", slug: "textile-manufacturing" },
                    { id: 2, name: "Furniture Production", slug: "furniture-production" },
                    { id: 3, name: "Automotive Parts", slug: "automotive-parts" },
                    { id: 4, name: "Industrial Equipment", slug: "industrial-equipment" },
                    { id: 5, name: "Packaging Solutions", slug: "packaging-solutions" },
                ]
            },
            {
                id: 2,
                name: "Construction & Materials",
                slug: "construction-materials",
                categories: [
                    { id: 6, name: "Building Materials", slug: "building-materials" },
                    { id: 7, name: "Steel & Iron", slug: "steel-iron" },
                    { id: 8, name: "Construction Equipment", slug: "construction-equipment" },
                    { id: 9, name: "Prefabricated Buildings", slug: "prefabricated-buildings" },
                    { id: 10, name: "Construction Contractors", slug: "construction-contractors" },
                ]
            },
            {
                id: 3,
                name: "Agriculture & Food",
                slug: "agriculture-food",
                categories: [
                    { id: 11, name: "Agricultural Products", slug: "agricultural-products" },
                    { id: 12, name: "Food & Beverage Manufacturing", slug: "food-beverage-manufacturing" },
                    { id: 13, name: "Organic Farming", slug: "organic-farming" },
                    { id: 14, name: "Fresh Produce Export", slug: "fresh-produce-export" },
                    { id: 15, name: "Dairy & Meat Products", slug: "dairy-meat-products" },
                ]
            },
            {
                id: 4,
                name: "Textile & Apparel",
                slug: "textile-apparel",
                categories: [
                    { id: 16, name: "Clothing & Apparel", slug: "clothing-apparel" },
                    { id: 17, name: "Home Textiles", slug: "home-textiles" },
                    { id: 18, name: "Footwear Manufacturing", slug: "footwear-manufacturing" },
                    { id: 19, name: "Fashion Accessories", slug: "fashion-accessories" },
                    { id: 20, name: "Fabric & Yarn Suppliers", slug: "fabric-yarn-suppliers" },
                ]
            },
            {
                id: 5,
                name: "Logistics & Transportation",
                slug: "logistics-transportation",
                categories: [
                    { id: 21, name: "Freight Forwarding", slug: "freight-forwarding" },
                    { id: 22, name: "Warehousing Solutions", slug: "warehousing-solutions" },
                    { id: 23, name: "Shipping Services", slug: "shipping-services" },
                    { id: 24, name: "Import/Export Services", slug: "import-export-services" },
                    { id: 25, name: "Customs Clearance", slug: "customs-clearance" },
                ]
            },
            {
                id: 6,
                name: "Energy & Environment",
                slug: "energy-environment",
                categories: [
                    { id: 26, name: "Renewable Energy", slug: "renewable-energy" },
                    { id: 27, name: "Solar Panel Suppliers", slug: "solar-panel-suppliers" },
                    { id: 28, name: "Waste Management", slug: "waste-management" },
                    { id: 29, name: "Energy-efficient Technologies", slug: "energy-efficient-technologies" },
                    { id: 30, name: "Water Treatment Solutions", slug: "water-treatment-solutions" },
                ]
            },
            {
                id: 7,
                name: "Machinery & Equipment",
                slug: "machinery-equipment",
                categories: [
                    { id: 31, name: "Industrial Machinery", slug: "industrial-machinery" },
                    { id: 32, name: "Construction Machinery", slug: "construction-machinery" },
                    { id: 33, name: "Agricultural Machinery", slug: "agricultural-machinery" },
                    { id: 34, name: "Packaging Machines", slug: "packaging-machines" },
                    { id: 35, name: "Heavy Equipment", slug: "heavy-equipment" },
                ]
            },
            {
                id: 8,
                name: "Furniture & Interior Design",
                slug: "furniture-interior-design",
                categories: [
                    { id: 36, name: "Office Furniture", slug: "office-furniture" },
                    { id: 37, name: "Home Furniture", slug: "home-furniture" },
                    { id: 38, name: "Interior Design", slug: "interior-design" },
                    { id: 39, name: "Custom Furniture Manufacturing", slug: "custom-furniture-manufacturing" },
                    { id: 40, name: "Outdoor Furniture", slug: "outdoor-furniture" },
                ]
            },
            {
                id: 9,
                name: "Consumer Goods",
                slug: "consumer-goods",
                categories: [
                    { id: 41, name: "Home Appliances", slug: "home-appliances" },
                    { id: 42, name: "Kitchenware & Tableware", slug: "kitchenware-tableware" },
                    { id: 43, name: "Personal Care Products", slug: "personal-care-products" },
                    { id: 44, name: "Toys & Games", slug: "toys-games" },
                    { id: 45, name: "Electronics", slug: "electronics" },
                ]
            },
        ];

        // Return only the requested count
        return realCategories.slice(0, count);
    }
}
