import { useState, useEffect, useContext } from "react";
import { MoneyContext, UsernameContext, PuppyContext } from './context';
import { supabase } from "../../../lib/supabaseClient";

interface ShopItem {
  id: string;
  image: string;
  price: number;
}

export default function Shop() {
  const [shopMenu, setShopMenu] = useState(false);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const { image, setImage } = useContext(PuppyContext);  // Equipped image
  const { money, setMoney } = useContext(MoneyContext);
  const { username } = useContext(UsernameContext); // This is email

  const shopItems: ShopItem[] = [
    { id: "angelpuppy", image: "angelpuppy.png", price: 3 },
    { id: "artistpuppy", image: "artistpuppy.png", price: 2 },
    { id: "capepuppy", image: "capepuppy.png", price: 1 },
    { id: "clippuppy", image: "clippuppy.png", price: 1 },
    { id: "collarpuppy", image: "collarpuppy.png", price: 1 },
    { id: "devilpuppy", image: "devilpuppy.png", price: 1 },
    { id: "pinkclippuppy", image: "pinkclippuppy.png", price: 1 },
    { id: "smartpuppy", image: "smartpuppy.png", price: 1 },
    { id: "starpuppy", image: "starpuppy.png", price: 1 },
  ];

  // Fetch owned items once user is available
  useEffect(() => {
    const fetchOwnedItems = async () => {
      const { data, error } = await supabase
        .from("purchase")
        .select("product_id")
        .eq("email", username);

      if (error) {
        console.error("Error fetching owned items:", error.message);
      } else {
        const owned = data.map((entry) => entry.product_id);
        setOwnedItems(owned);

        // If equipped item is no longer owned (or null), reset
        if (!owned.includes(image)) {
          return;
        }
      }
    };

    if (username) fetchOwnedItems();
  }, [username]);

  const updateMoneyInDatabase = async (newMoney: number) => {
    const { error } = await supabase
      .from("userdata")
      .update({ money: newMoney })
      .eq("email", username);

    if (error) {
      console.error("Failed to update money:", error.message);
    }
  };

  const handlePurchase = async (item: ShopItem) => {
    if (ownedItems.includes(item.id) || money < item.price) return;

    const newMoney = money - item.price;

    const { error } = await supabase
      .from("purchase")
      .insert({ email: username, product_id: item.id });

    if (error) {
      console.error("Error recording purchase:", error.message);
      return;
    }

    setOwnedItems((prev) => [...prev, item.id]);
    setMoney(newMoney);
    updateMoneyInDatabase(newMoney);
  };

  const handleEquip = (itemId: string) => {
    if (!ownedItems.includes(itemId)) return;
    setImage(itemId);  // Equip it in context
  };

  return (
    <div>
      <button
        className="absolute bg-blue-100 p-2 text-3xl rounded-md cursor-pointer"
        onClick={() => setShopMenu(!shopMenu)}
      >
        🛍️
      </button>

      {shopMenu && (
        <div className="z-0 fixed bottom-29 right-0 flex bg-black opacity-80 w-1/6 h-1/2 mx-4 rounded-lg text-white font-semibold grid grid-cols-2 overflow-y-auto">
          {shopItems.map((item) => {
            const isOwned = ownedItems.includes(item.id);
            const canAfford = money >= item.price;
            const isEquipped = image === item.id;

            return (
              <div
                key={item.id}
                className={`w-fit h-fit my-2 mx-4 p-2 flex flex-col items-center rounded ${
                  isEquipped
                    ? "bg-yellow-400"
                    : isOwned
                    ? "bg-gray-400"
                    : !canAfford
                    ? "bg-red-300"
                    : "bg-green-200"
                }`}
              >
                <p className="text-xs"> {item.price} c</p>
                <img src={item.image} alt={item.id} className="w-fit h-fit" />

                {isOwned ? (
                  <button
                    onClick={() => handleEquip(item.id)}
                    className={`mt-1 text-xs px-2 py-1 rounded ${
                      isEquipped ? "bg-yellow-600" : "bg-blue-400 hover:bg-blue-500"
                    }`}
                  >
                    {isEquipped ? "Equipped" : "Equip"}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford}
                    className={`mt-1 text-xs px-2 py-1 rounded ${
                      !canAfford ? "bg-red-500" : "bg-green-400 hover:bg-green-500"
                    }`}
                  >
                    Purchase
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
