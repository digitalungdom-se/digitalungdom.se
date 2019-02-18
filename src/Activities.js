import React from 'react'
import { Row, Col } from 'antd'

const sizes = {
	style: { padding: 40 },
	lg: { span: 12 },
	md: { span: 18 },
	sm: { span: 24 },
	xs: { span: 24 },
}

const Activities = () => (
	<Row
		type="flex"
		justify="center"
	>
		<Col
			{...sizes}
			className="window"
		>
			<h1>Verksamhet</h1>
			<p>
				Digital Ungdom som nystartat förbund har tagit fram flera delmål och planer på verksamhet.
			</p>
			<h2>Delmål 1: Nätverk av elever</h2>
			<p>
				Ett av Digital Ungdoms viktigaste delmål är att utveckla ett nätverk av teknik- och programmeringsintresserade ungdomar. För att uppfylla detta mål utvecklas en plattform för intresserade ungdomar där de aktivt kan diskutera, samarbeta i projekt, utvecklas, och lära sig av varandra.
			</p>
			<h2>Delmål 2: Öka förståelse för påverkan av digitalisering</h2>
			<p>
				Det är av yttersta vikt att ungdomar, och allmänheten i sin helhet, förstår hur dagens digitala teknik påverkar oss och hur de kommer påverka oss i framtiden. Idag är det viktigt att vara medveten om hur företag behåller användares integritet. För framtiden är det viktigt att veta artificiell intelligens och automatisering kommer påverka samhället. För att uppfylla detta planeras spridning av lättförståeliga videor, artiklar, och föreläsningar som sprider sådan medvetenhet.
			</p>
			<h2>Delmål 3: Skapande av digital teknik</h2>
			<p>
				För att Sverige ska ligga i framkanten av digital utveckling krävs att fler ungdomar lär sig programmering, och speciellt viktigt är att utveckla avancerade programmeringskunskaper hos de ungdomar som är intresserade. För att göra detta planeras på lång sikt sommarskolor, som förbundsstyrelsen har erfarenhet från Rays och Rymdforskarskolan.
			</p>
			<h2>Delmål 4: Användande av digital teknik</h2>
			<p>
				Många anställare förutsätter i dag att ungdomar har essentiella förkunskaper för att använda digitala miljöer. Digital Ungdom har som mål att ungdomar generellt ska ha dessa essentiella förmågorna, samt att hålla dessa förmågor uppdaterade allt eftersom nya tekniker utvecklas.
			</p>
			<h2>Delmål 5: Verktyg för studier</h2>
			<p>
				Digital Ungdom har som avsikt att alla ungdomar ska kunna använda sig av metoder som stödjer deras studier, samt att känna till vilka distraktionsmoment som kan uppstå. Med detta inkluderas bland annat informationssökning och källkritik.
			</p>
			<h2>Delmål 6: Främja tjejers intresse</h2>
			<p>
				Alla tjejer bör få samma möjligheter som killar att utveckla ett intresse för teknik och programmering. Detta planeras att göras genom att främja en blandad och välkomnande miljö som alla kan känna sig hemma i.
			</p>
		</Col>
	</Row>
)

export default Activities
