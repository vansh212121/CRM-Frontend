import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "bg-white text-black border border-gray-200 shadow-lg",
          description: "text-black opacity-100",
          actionButton: "bg-black text-white",
          cancelButton: "bg-gray-100 text-black",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
