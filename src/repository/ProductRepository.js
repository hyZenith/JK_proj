import AppConst from "../AppConst";
import { authService } from "../service/AuthService";
import ManufacturerRepository from "./ManufacturerRepository";



export default class ProductRepository {

    static async add(product) {
        try {
            const response = await fetch(AppConst.api(AppConst.searchProducts));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(12);
    }

    static async update(product) {
        try {
            const response = await fetch(AppConst.api(AppConst.searchProducts));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(12);
    }

    static async delete(id) {
        try {
            const response = await fetch(AppConst.api(AppConst.searchProducts));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(12);
    }

    static async search() {
        try {
            const response = await fetch(AppConst.api(AppConst.searchProducts));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(12);
    }

    static async getBySlug(slug) {
        try {
            const response = await fetch(AppConst.api(AppConst.product));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(1)[0];
    }

    static async getRelatedProductsOf(productId) {
        try {
            const url = new URL(AppConst.api(AppConst.relatedProduct));
            url.searchParams.append('id', productId);
            const response = await fetch(url);

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(10);
    }


    /**
     * This will toggle the bookmark status
     * @param {number} id 
     * @returns 
     */
    static async bookmark(id) {
        try {
            const url = new URL(AppConst.api(AppConst.bookmarkProduct));
            url.searchParams.append('id', id);

            const response = await fetch(url, {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                const jsonData = await response.json();
                return jsonData.status;
            }
        } catch (e) {
            return false;
        }

        return false;
    }

    static async bookmarks() {
        try {
            const response = await fetch(AppConst.api(AppConst.bookmarkedProduct));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ProductRepository.fake(12);
    }

    static fake(count) {
        const products = [];
        for (let i = 1; i <= count; i++) {
            const images = [];
            for (let m = 1; m <= 5; m++) {
                images.push({
                    url: `https://picsum.photos/300/300?random=${m}`
                });
            }
            products.push({
                id: i,
                name: `Product ${i}`,
                slug: `product-${i}`,
                category: {
                    slug: `cat-${i}`,
                    category: {
                        slug: `main-cat-${i}`
                    }
                },
                price: (Math.random() * 100 + 50).toFixed(2),
                reducedPrice: Math.random() > 0.5 ? (Math.random() * 50 + 20).toFixed(2) : null,
                featuredImage: {
                    url: `https://picsum.photos/300/300?random=${i}`
                },
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, ipsum sit amet aliquam elementum, dolor lectus malesuada magna, non aliquet lectus justo ut neque. Fusce lacinia tristique magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ligula turpis, congue et lobortis pellentesque, elementum vitae nunc. Proin suscipit eu est eget ullamcorper. Etiam molestie fermentum tristique. Mauris pharetra enim quis dapibus vulputate. Maecenas tempor purus magna, sed faucibus erat finibus vitae. Nam nec sagittis dui. Nulla eu pharetra arcu. Quisque sollicitudin libero in diam gravida tristique. Nulla velit leo, ultrices id sodales in, ornare non tortor.
                    Nunc sagittis ultrices mauris, eu aliquet justo laoreet at. Vivamus interdum dui in arcu luctus venenatis. Duis vel orci finibus, auctor dui id, malesuada diam. Pellentesque non maximus est. Duis pretium rutrum rutrum. Aenean a nisl lobortis, commodo nulla in, consequat elit. Fusce sollicitudin eleifend nulla, at elementum dui ultricies consectetur. Donec congue tellus id libero laoreet gravida. Etiam porttitor orci vel massa dictum, ac feugiat ex viverra. Duis eget lacinia ligula, vitae finibus augue. Nullam tincidunt egestas turpis eu mollis. Aenean feugiat enim vel enim hendrerit placerat. Suspendisse cursus cursus neque vitae pulvinar. Mauris nec turpis eu lectus commodo tempor a vel metus. Donec blandit sem ut neque faucibus condimentum.
                    Nullam nibh sapien, aliquet sit amet dictum dignissim, viverra ut ligula. Phasellus non dictum tortor. Praesent elementum, lectus vel pellentesque aliquam, est nisi finibus felis, sed pulvinar erat nisl porttitor ipsum. Cras ut ligula elit. Pellentesque cursus pretium nisi nec tempus. Ut tincidunt sapien id lacus feugiat, ut mattis enim commodo. Quisque at ante justo. Donec feugiat mi a libero condimentum, semper congue urna facilisis. Integer non condimentum leo.`,
                images: images,
                manufacturer: ManufacturerRepository.fake(1)[0]
            });
        }
        return products;
    }
}