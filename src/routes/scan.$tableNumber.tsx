import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { SplashScreen } from "@/components/SplashScreen";

export const Route = createFileRoute("/scan/$tableNumber")({
  head: () => ({
    meta: [
      { title: "Menu — Love Africa" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const { tableNumber } = Route.useParams();
  const navigate = useNavigate();

  const goToMenu = useCallback(() => {
    navigate({
      to: "/table/$tableNumber",
      params: { tableNumber },
      replace: true,
    });
  }, [navigate, tableNumber]);

  return <SplashScreen tableNumber={tableNumber} onComplete={goToMenu} />;
}
