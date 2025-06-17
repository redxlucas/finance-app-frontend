import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export default function SettingsPage() {
    // const { user } = useAuth();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                {t("settings.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
                {t("settings.description")}
            </p>

            <Select
                value={currentLanguage}
                onValueChange={(value) => i18n.changeLanguage(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
