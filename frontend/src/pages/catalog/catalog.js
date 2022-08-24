import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import './catalog.css';
import { getServices } from "../../api/getServices";
import { useEffect, useState } from "react";
import LargeServiceBox from "../../components/largeServiceBox/largeServiceBox";

function Catalog(props) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getServices(1,2,3);
            setServices(result);
        }

        fetchServices(); 
    }, [])

    return (
        <div>
            <Nav
                homeNav="store"
                showSolution={true}
                showServices={false}
                showAccountSettings={true}
            />
            <header>
                <h2 className="page-header">Our Offerings</h2>
                <div className="filters">
                    <div className="filter-group">
                        <label for="target">Pest Type</label>
                        <select name="target">
                            <option value="ants">Ants</option>
                            <option value="rodents">Rodents</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="serviceType">Service Type</label>
                        <select name="serviceType">
                            <option value="One Time">One Time</option>
                            <option value="Recurring">Ongoing Program</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="warranty">Includes Warranty?</label>
                        <select name="warranty">
                            <option value="yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    )
}

export default Catalog;