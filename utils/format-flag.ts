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

interface Flags {
    [key: string]: any;
}

const flags: Flags = {
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

export function formatFlag(flag: string) {
    return flags[flag] || '';
}
