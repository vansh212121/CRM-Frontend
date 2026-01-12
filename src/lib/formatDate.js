import { format } from "date-fns";

export const formatRawDate = (isoString) => {
    if (!isoString) return "N/A";

    const rawString = isoString.replace("Z", "").replace(/\+\d{2}:\d{2}$/, "");

    const date = new Date(rawString);

    return format(date, "MMM d, yyyy");
};

