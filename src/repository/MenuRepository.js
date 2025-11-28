import AppConst from "../AppConst";


export default class MenuRepository {

    static async footerMenu() {
        try {
            const response = await fetch(AppConst.api(AppConst.footerMenu));

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return [
            {
                name: "Menu Name",
                links: [
                    { name: "Link 1", routeName: "route_1" },
                    { name: "Link 2", routeName: "route_2" },
                ],
            },
            {
                name: "Menu Name",
                links: [
                    { name: "Link 1", routeName: "route_1" },
                    { name: "Link 2", routeName: "route_2" },
                ],
            },
            {
                name: "Menu Name",
                links: [
                    { name: "Link 1", routeName: "route_1" },
                    { name: "Link 2", routeName: "route_2" },
                ],
            },
            {
                name: "Menu Name",
                links: [
                    { name: "Link 1", routeName: "route_1" },
                    { name: "Link 2", routeName: "route_2" },
                ],
            }
        ];
    }
}