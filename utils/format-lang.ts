import br from "@/public/flags/BR.svg";
import cn from "@/public/flags/CN.svg";
import de from "@/public/flags/DE.svg";
import es from "@/public/flags/ES.svg";
import fr from "@/public/flags/FR.svg";
import it from "@/public/flags/IT.svg";
import jp from "@/public/flags/JP.svg";
import ru from "@/public/flags/RU.svg";
import sa from "@/public/flags/SA.svg";
import us from "@/public/flags/US.svg";

interface Langs {
    [key: string]: any;
}

const langsFlags: Langs = {
    "cn": cn,
    "de": de,
    "en": us,
    "es": es,
    "fr": fr,
    "it": it,
    "jp": jp,
    "pt": br,
    "ru": ru,
    "sa": sa,
};

export function formatLangFlag(lang: string) {
    return langsFlags[lang] || '';
}

const langs: Langs = {
    "cn": "中国",
    "de": "DE",
    "en": "US",
    "es": "ES",
    "fr": "FR",
    "it": "IT",
    "jp": "日本",
    "pt": "PT",
    "ru": "РФ",
    "sa": "الم"
};

export function formatLang(lang: string) {
    return langs[lang] || lang;
}
