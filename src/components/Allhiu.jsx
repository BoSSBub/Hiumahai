import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
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

    const handleCopy = () => {
        const link = "https://hiumahai.co.th/nongbosssy";
        navigator.clipboard.writeText(link);
    };

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
                console.log(data);
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
        <div className="container">
            <div className="profile-section">
                <div className="profile-info">
                    <img src={profileImageSrc} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">{username || 'User'}</h2>
                        <div className="profile-link-container">
                            <a href="https://hiumahai.co.th/nongbosssy" className="profile-link">
                                {email}
                            </a>
                            <button className="copy-button" onClick={handleCopy}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title"><h2>รับหิ้วทั้งหมด</h2></div>
            <div className="orderhiu">
                {merchantProducts.length > 0 ? (
                    merchantProducts.map(product => (
                        <div key={product.ProductId} className="product-card-allhiu">
                            <img src={`data:image/jpeg;base64,${product.productImg}`} alt={product.productName} className="product-image-allhiu" />
                            <h3 className="product-name-allhiu">{product.productName}</h3>
                            <p className="product-detail-allhiu">{product.productDetail}</p>
                            <p className="product-price-allhiu">ราคา: {product.productPrice} บาท</p>
                            <img src={`data:image/jpeg;base64,${product.brandImg}`} alt={product.productName} className="product-image-allhiu" />
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
