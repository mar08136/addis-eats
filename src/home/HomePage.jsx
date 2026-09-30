import { Link } from "react-router-dom";
import heroFood from "../asset/hero-food.png";

const categories = [
    {
        name: "Fast Food",
        category: "fast-food",
        image: "/images/fast-food.png",
    },
    {
        name: "Chicken & Fish",
        category: "chicken-fish",
        image: "/images/chicken & fish.png",
    },
    {
        name: "Sweets",
        category: "sweets",
        image: "/images/sweets.png",
    },
    {
        name: "Breakfast",
        category: "breakfast",
        image: "/images/break-fast.png",
    },
    {
        name: "Drinks",
        category: "drinks",
        image: "/images/drinks.png",
    },
    {
        name: "Traditional Food",
        category: "traditional-food",
        image: "/images/traditionalfood.png",
    },
];

function HomePage() {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-label">
                        AUTHENTIC ETHIOPIAN FLAVORS
                    </p>

                    <h1>
                        Delicious food,
                        <span> delivered to you.</span>
                    </h1>

                    <p className="hero-description">
                        Discover your favorite Ethiopian dishes and enjoy
                        delicious meals delivered straight to your door.
                    </p>

                    <div className="hero-search">
                        <div className="search-input-wrapper">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="6" />
                                <path d="m20 20-4.5-4.5" />
                            </svg>

                            <input
                                type="text"
                                placeholder="Search dishes, drinks or cuisines..."
                            />
                        </div>

                        <Link
                            to="/menu"
                            className="find-food-button"
                        >
                            Find Food →
                        </Link>
                    </div>
                </div>

                <div className="hero-image-container">
                    <img
                        src={heroFood}
                        alt="Delicious Ethiopian food"
                        className="hero-image"
                    />
                </div>
            </section>

            <section className="hero-features">
                <div className="hero-feature">
                    <div className="feature-icon">🚚</div>
                    <div>
                        <h3>Fast Delivery</h3>
                        <p>To your door</p>
                    </div>
                </div>

                <div className="hero-feature">
                    <div className="feature-icon">🍽</div>
                    <div>
                        <h3>Fresh & Authentic</h3>
                        <p>Local flavors</p>
                    </div>
                </div>

                <div className="hero-feature">
                    <div className="feature-icon">🔒</div>
                    <div>
                        <h3>Secure Payment</h3>
                        <p>Multiple options</p>
                    </div>
                </div>
            </section>

            <section className="categories-section">
                <div className="categories-header">
                    <div>
                        <p className="section-label">EXPLORE</p>
                        <h2>EXPLORE BY CATEGORY</h2>
                    </div>

                    <Link
                        to="/menu"
                        className="view-all-button"
                    >
                        View all
                    </Link>
                </div>

                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            to={`/menu?category=${category.category}`}
                            className="category-card"
                            key={category.category}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                            />

                            <div className="category-overlay">
                                <h3>{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="popular-section">
                <div className="section-heading">
                    <div>
                        <p className="section-label">
                            POPULAR NEARBY
                        </p>

                        <h2>Popular Bites Across the City</h2>

                        <p>
                            Discover delicious food choices loved by
                            people around Addis.
                        </p>
                    </div>

                    <Link to="/menu">
                        View all
                    </Link>
                </div>

                <div className="popular-grid">
                    <Link
                        to="/menu?category=fast-food"
                        className="popular-card"
                    >
                        <img
                            src="/images/fast-food.png"
                            alt="Fast food"
                        />

                        <div className="popular-card-content">
                            <h3>Fast Food</h3>

                            <p>
                                Quick, delicious meals perfect for
                                when you are hungry.
                            </p>

                            <div className="popular-card-bottom">
                                <strong>Explore</strong>
                                <span>View dishes →</span>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/menu?category=chicken-fish"
                        className="popular-card"
                    >
                        <img
                            src="/images/chicken & fish.png"
                            alt="Chicken and fish"
                        />

                        <div className="popular-card-content">
                            <h3>Chicken & Fish</h3>

                            <p>
                                Enjoy flavorful chicken and fish
                                dishes prepared for every craving.
                            </p>

                            <div className="popular-card-bottom">
                                <strong>Explore</strong>
                                <span>View dishes →</span>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/menu?category=sweets"
                        className="popular-card"
                    >
                        <img
                            src="/images/sweets.png"
                            alt="Sweets"
                        />

                        <div className="popular-card-content">
                            <h3>Sweets</h3>

                            <p>
                                Treat yourself to something sweet
                                after your meal.
                            </p>

                            <div className="popular-card-bottom">
                                <strong>Explore</strong>
                                <span>View dishes →</span>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/menu?category=traditional-food"
                        className="popular-card"
                    >
                        <img
                            src="/images/traditionalfood.png"
                            alt="Traditional Ethiopian food"
                        />

                        <div className="popular-card-content">
                            <h3>Traditional Food</h3>

                            <p>
                                Experience authentic Ethiopian
                                flavors and local favorites.
                            </p>

                            <div className="popular-card-bottom">
                                <strong>Explore</strong>
                                <span>View dishes →</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="about-section">
                <div className="about-image">
                    <img
                        src="/images/traditionalfood.png"
                        alt="Traditional Ethiopian food"
                    />
                </div>

                <div className="about-content">
                    <p className="section-label">
                        ABOUT ADDIS EATS
                    </p>

                    <h2>
                        Bringing the taste of Addis closer to you.
                    </h2>

                    <p>
                        Addis Eats makes it simple to discover and enjoy
                        delicious Ethiopian food from the comfort of your
                        home.
                    </p>

                    <p>
                        From traditional favorites to quick meals and
                        refreshing drinks, we bring together a variety of
                        flavors so you can find something you love.
                    </p>

                    <Link
                        to="/menu"
                        className="about-button"
                    >
                        Explore Our Menu →
                    </Link>
                </div>
            </section>

            <section className="how-section">
                <div className="section-heading centered">
                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h2>
                        Good food, three simple steps
                    </h2>

                    <p>
                        From your screen to your door without the
                        unnecessary drama.
                    </p>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <span>01</span>

                        <div className="step-icon">🔎</div>

                        <h3>Choose your food</h3>

                        <p>
                            Browse our menu and find something you
                            are craving.
                        </p>
                    </div>

                    <div className="step-card">
                        <span>02</span>

                        <div className="step-icon">🛒</div>

                        <h3>Place your order</h3>

                        <p>
                            Add your favorites to the cart and
                            complete checkout.
                        </p>
                    </div>

                    <div className="step-card">
                        <span>03</span>

                        <div className="step-icon">🏠</div>

                        <h3>Enjoy your meal</h3>

                        <p>
                            Relax while we prepare and deliver your
                            order.
                        </p>
                    </div>
                </div>
            </section>

            <section className="home-cta">
                <div>
                    <p className="section-label">
                        HUNGRY?
                    </p>

                    <h2>
                        Your next favorite meal is waiting.
                    </h2>

                    <p>
                        Explore our menu and order something
                        delicious today.
                    </p>
                </div>

                <Link to="/menu">
                    Explore Menu →
                </Link>
            </section>
        </main>
    );
}

export default HomePage;