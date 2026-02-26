import { useState } from "react";
import UsersPage from "./pages/UserPage";
import UserDetailPage from "./pages/UserDetailPage";
import ErrorBoundary from "./components/ui/ErrorBoundary";

const NAV = [
  { icon: "👥", label: "Users", page: "users" },
  { icon: "📊", label: "Analytics", page: "analytics" },
  { icon: "⚙️", label: "Settings", page: "settings" },
];

export default function App() {
  const [view, setView] = useState({ page: "users" });
  const activeSection = view.page === "detail" ? "users" : view.page;

  return (
    <div>
      <aside>
        <div>◈ @@@@@</div>

        {NAV.map(({ icon, label, page }) => (
          <button key={page} onClick={() => setView({ page })}>
            {icon} {label}
          </button>
        ))}

        
      </aside>

      <main>
        <ErrorBoundary>
          {view.page === "users" && (
            <UsersPage
              onViewUser={(id) => setView({ page: "detail", userId: id })}
            />
          )}
          {view.page === "detail" && (
            <UserDetailPage
              userId={view.userId}
              onBack={() => setView({ page: "users" })}
            />
          )}
          {view.page === "analytics" && <p>📊 Analytics — coming soon</p>}
          {view.page === "settings" && <p>⚙️ Settings — coming soon</p>}
        </ErrorBoundary>
      </main>
    </div>
  );
}
