import AppConst from "../AppConst";
import { authService } from "../service/AuthService";
import ProductRepository from "./ProductRepository";
import ReviewRepository from "./ReviewRepository";



export default class ManufacturerRepository {

    static async search() {
        try {
            const response = await fetch(AppConst.api(AppConst.searchManufacturers));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return ManufacturerRepository.fake(12);
    }

    static async searchByCategory(slug) {
        try {
            const url = new URL(AppConst.api(AppConst.searchManufacturers));
            if (slug) url.searchParams.append('category', slug);
            const response = await fetch(url);

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.error("Failed to fetch manufacturers by category:", e);
        }

        return ManufacturerRepository.fake(6);
    }

    static async getPhoneNumber() {
        try {
            const response = await fetch(AppConst.api(AppConst.manufacturerPhoneNumber), {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return "+90145165146";
    }

    static async getWebsiteLink() {
        try {
            const response = await fetch(AppConst.api(AppConst.manufacturerWebsite), {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return "https://gotradeagency.com";
    }

    static async getSocial() {
        try {
            const response = await fetch(AppConst.api(AppConst.manufacturerSocial), {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return "https://youtube.com";
    }

    static async promoted() {
        try {
            const response = await fetch(AppConst.api(AppConst.promotedManufacturers));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return ManufacturerRepository.fake(15);
    }

    static async homepage() {
        try {
            const response = await fetch(AppConst.api(AppConst.homepageManufacturers));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return ManufacturerRepository.fake(12);
    }

    static async bySlug(slug) {
        try {
            const url = new URL(AppConst.api(AppConst.manufacturer));
            url.searchParams.append('slug', slug)
            const response = await fetch(url);

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return {
            id: 1,
            name: slug,
            description: "This is a sample store description.",
            avatar: `https://picsum.photos/300/300?random=${1}`,
            verified: true,
            products: ProductRepository.fake(77), // Optional: load products if needed
            reviews: ReviewRepository.fake(16), // Optional: load reviews
        };
    }

    /**
     * This will toggle the bookmark status
     * @param {number} id 
     * @returns 
     */
    static async bookmark(id) {
        try {
            const url = new URL(AppConst.api(AppConst.bookmarkManufacturer));
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
            const response = await fetch(AppConst.api(AppConst.bookmarkedManufacturer), {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return ManufacturerRepository.fake(12);
    }

    static fake(count) {
        const manufacturers = [];
        for (let i = 1; i <= count; i++) {
            manufacturers.push({
                id: i,
                name: `Manufacturer ${i}`,
                slug: `manufacturer-${i}`,
                verified: true,
                avatar: `https://picsum.photos/300/300?random=${i}`,
                rating: 5,
                description: "A summary description of the company appears here. A summary description of the company appears here. A summary ."
            });
        }
        return manufacturers;
    }
}