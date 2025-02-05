import React, { useEffect } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
    // Sahifa refresh bo‘lganda localStorage-dan oxirgi kategoriya qiymatini yuklash
    useEffect(() => {
        const savedCategory = localStorage.getItem("selectedCategory");
        if (savedCategory) {
            setCategory(savedCategory);
        }
    }, []);

    // Kategoriya tanlanganda localStorage-ga yozish
    const handleCategoryClick = (menuName) => {
        const newCategory = category === menuName ? "ALL" : menuName;
        setCategory(newCategory);
        localStorage.setItem("selectedCategory", newCategory);
    };

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet beatae doloremque eum et qui! Exercitationem similique officiis iusto voluptate autem fugit necessitatibus provident eos repudiandae?
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => handleCategoryClick(item.menu_name)}
                        key={index}
                        className="explore-menu-list-item"
                    >
                        <img
                            className={category === item.menu_name ? "active" : ""}
                            src={item.menu_image}
                            alt={item.menu_name}
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
