import SmallServiceBox from "../smallServiceBox/smallServiceBox";
import lawnshield from '../../assets/lawnshield.JPG';
import rodentStation from '../../assets/rodentbait.JPG';
import sentricon from '../../assets/sentricon.jpeg';
import deweb from '../../assets/deweb.JPG';
import { selectIsAuth } from "../../features/auth";
import { selectSelectedPest } from "../../features/wizardSlice";
import { useSelector } from "react-redux";

function SmallServiceHighlightRow() {
    const isPestSelected = useSelector(selectSelectedPest);
    const isAuth = useSelector(selectIsAuth);

    const services = [
        { 
            id: 'all',
            name: 'All in One',
            subtext: 'Covers 33 common pests, termites, rodents',
            img: rodentStation,
            link: 1
        },
        {
            id: 'ls',
            name: 'LawnShield',
            subtext: 'Covers mosquitoes and ticks during summer',
            img: lawnshield,
            link: 5
        },
        {
            id: 'sentricon',
            name: 'Sentricon Baiting',
            subtext: 'Year-round active termite baiting',
            img: sentricon,
            link: 7
        },
        {
            id: 'castle',
            name: 'Castle Program',
            subtext: 'Covers rodents, pests and an annual termite inspection',
            img: deweb,
            link: 2
        }
    ];

    const serviceBoxes = services.map(service => {
        return (
            <SmallServiceBox
                key={service.id}
                name={service.name}
                subtext={service.subtext}
                img={service.img}
                link={isAuth && isPestSelected ? `/service/${service.link}` : `/service/general/${service.link}`}
            />
        )
    })

    return (
        <div className="row row-center">
            {serviceBoxes}
        </div>
    )
}

export default SmallServiceHighlightRow;