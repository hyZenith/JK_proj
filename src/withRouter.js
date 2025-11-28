import { useParams, useNavigate, useLocation } from "react-router-dom";
import CookieStorage from "./tools/CookieStorage";
import TranslateUtility from "./tools/TranslateUtility";
import AppConst from "./AppConst";
import {authService} from "./service/AuthService";
import modalService from "./service/ModalService";
import { refreshService } from "./service/RefreshService";

export default function withRouter(WrappedComponent) {

    return function WrapperComponent(props) {
        let params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        const query = Object.fromEntries(new URLSearchParams(location.search).entries());
        const cookies = CookieStorage.getAll();

        // Language detection
        let lang = params['lang']?.toLowerCase();
        if (lang === null) {
            if (query['hl']) {
                lang = query['hl']?.toLowerCase();
                if (AppConst.languages.hasOwnProperty(lang)) {
                    lang = query['hl'];
                }
            } else if (AppConst.languages.hasOwnProperty(cookies.lang)) {
                lang = cookies.lang;
            }
        }
        if (!AppConst.languages.hasOwnProperty(lang)) {
            lang = AppConst.defaultLang;
        }
        TranslateUtility.setLang(lang);

        // Custom navigate that dispatches an event
        const customNavigate = (to, options = {}) => {
            window.dispatchEvent(new Event("url-change"));
            const url = to;

            if (options.isExternal) {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }

        };

        return (
            <WrappedComponent
                {...props}
                auth={authService}
                modal={modalService}
                cookies={cookies}
                refreshService={refreshService}
                locale={{
                    current: lang,
                    default: AppConst.defaultLang,
                    locales: AppConst.languages,
                }}
                router={{
                    params,
                    query,
                    navigate: customNavigate, // override default navigate
                    location,

                }}
                t={TranslateUtility.t.bind(TranslateUtility)}
            />
        );
    };
}
