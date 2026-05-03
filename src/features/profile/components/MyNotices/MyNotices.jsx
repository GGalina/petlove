import { useState } from "react";
import { useSelector } from "react-redux";
import { favoriteIds, selectViewed } from "@/store/auth/authSelectors";

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState("favorites");

  const favorites = useSelector(favoriteIds);
  const viewed = useSelector(selectViewed);

  const notices = activeTab === "favorites" ? favorites : viewed;

  return (
    <section>
      <h2>My Notices</h2>

      {/* TABS */}
      <div>
        <button
          onClick={() => setActiveTab("favorites")}
          style={{
            fontWeight: activeTab === "favorites" ? "bold" : "normal",
          }}
        >
          My favorite pets
        </button>

        <button
          onClick={() => setActiveTab("viewed")}
          style={{
            fontWeight: activeTab === "viewed" ? "bold" : "normal",
          }}
        >
          Viewed
        </button>
      </div>

      {/* CONTENT */}
      <div>
        {notices.length === 0 ? (
          <p>No notices yet</p>
        ) : (
          <ul>
            {notices.map((notice) => (
              <li key={notice._id}>
                <img src={notice.imgURL} alt={notice.title} width={80} />

                <h4>{notice.title}</h4>
                <p>Name: {notice.name}</p>
                <p>Species: {notice.species}</p>
                <p>Category: {notice.category}</p>

                {/* ❗ placeholder delete button (favorites only later) */}
                {activeTab === "favorites" && (
                  <button>Remove from favorites</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}