import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Allhiu.css';

function Allhiu() {
    const location = useLocation();
    const { userDetails } = location.state || {};  // Retrieve userDetails
    const { username, userimg, email } = userDetails || {};  // Safely access values
    const defaultProfileImg = "https://via.placeholder.com/60";
    const profileImageSrc = userimg ? `data:image/jpeg;base64,${userimg}` : defaultProfileImg;

    const [merchantProducts, setMerchantProducts] = useState([]);  // State to store fetched products
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch merchant products when the component mounts
    useEffect(() => {
        const fetchMerchantProducts = async () => {
            try {
                const response = await fetch(`https://localhost:7078/api/Merchant?email=${email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMerchantProducts(data);  // Update state with fetched products
            } catch (error) {
                setError(error.message);  // Update error state
            } finally {
                setLoading(false);  // Set loading to false after fetching
            }
        };

        if (email) {  // Only fetch if email is available
            fetchMerchantProducts();
        }
    }, [email]);  // Dependency array to re-run effect when email changes

    if (loading) {
        return <div>Loading...</div>;  // Render loading state
    }

    if (error) {
        return <div>Error: {error}</div>;  // Render error state
    }

    return (
        <div className="container1">
            <div className="profile-section1">
                <div className="profile-info1">
                    <img src={profileImageSrc} alt="Profile" className="profile-image1" />
                    <div className="profile-details1">
                        <h2 className="profile-name1">{username || 'User'}</h2>
                        <div className="profile-link-container1">
                            <a href="https://hiumahai.co.th/nongbosssy" className="profile-link1">
                                {email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title1"><h2>รับหิ้วทั้งหมด</h2></div>
            <div className="product-list1">
                {merchantProducts.length > 0 ? (
                    merchantProducts.map(product => (
                        <div key={product.ProductId} className="product-card1">
                            <img src={`data:image/jpeg;base64,${product.productImg}`} alt={product.productName} className="product-image1" />
                            <div className="product-info1">
                                <img src={`data:image/jpeg;base64,${product.brandImg}`} alt="Brand1" className="brand-image1" />
                                <h3 className="product-name1">{product.productName}</h3>
                            </div>
                            <p className="product-price1">ราคา: {product.productPrice} บาท</p>
                        </div>
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>
        </div>
    );
}

export default Allhiu;
