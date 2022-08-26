import SmallServiceBox from "../smallServiceBox/smallServiceBox";
import lawnshield from '../../assets/lawnshield.JPG';
import rodentStation from '../../assets/rodentbait.JPG';
import sentricon from '../../assets/sentricon.jpeg';
import deweb from '../../assets/deweb.JPG';

function SmallServiceHighlightRow() {
    const services = [
        { 
            id: 'all',
            name: 'All in One',
            subtext: 'Covers 33 common pests, termites, rodents',
            img: rodentStation,
            link: 'services/1'
        },
        {
            id: 'ls',
            name: 'LawnShield',
            subtext: 'Covers mosquitoes and ticks during summer',
            img: lawnshield,
            link: 'services/2'
        },
        {
            id: 'sentricon',
            name: 'Sentricon Baiting',
            subtext: 'Year-round active termite baiting',
            img: sentricon,
            link: 'services/3'
        },
        {
            id: 'castle',
            name: 'Castle Program',
            subtext: 'Covers rodents, pests and an annual termite inspection',
            img: deweb,
            link: 'services/4'
        }
    ];

    const serviceBoxes = services.map(service => {
        return (
            <SmallServiceBox
                key={service.id}
                name={service.name}
                subtext={service.subtext}
                img={service.img}
                link={service.link}
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