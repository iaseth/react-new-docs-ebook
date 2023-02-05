import './App.scss';
import ebook from '../ebook.json';

import Header from './Header';
import TableOfContents from './TableOfContents';
import Footer from './Footer';



function DownloadSection ({title, href, description}) {
	return (
		<section className="px-4 py-3">
			<a href={href} className="block relative group font-bold px-4 py-6 pb-5 bg-red-600 text-white mb-5 rounded shadow overflow-hidden">
				<div>{title}</div>
				{/* left and bottom border */}
				<div className={"absolute bg-white h-full w-[2px] left-0 -bottom-full duration-300 group-hover:bottom-0"}></div>
				<div className={"absolute bg-white w-full h-[2px] bottom-0 -left-full duration-300 group-hover:left-0"}></div>

				{/* right and top border */}
				<div className={"absolute bg-white h-full w-[2px] right-0 -top-full duration-300 group-hover:top-0"}></div>
				<div className={"absolute bg-white w-full h-[2px] top-0 -right-full duration-300 group-hover:right-0"}></div>
			</a>
			<h4>{description}</h4>
		</section>
	);
}

function App () {

	return (
		<div className="">
			<Header />

			<main className="bg-slate-200 text-slate-800">
				<section className="px-4 py-16 bg-slate-800 text-white text-center">
					<h2>Download</h2>
					<div className="flex ch:grow ch:basis-0 max-w-md mx-auto py-8">
						<DownloadSection title="AZW3" description="For Kindle" href="https://drive.google.com/file/d/1XeUoDJs47pd87Dz8xAJeysGWim6_b_D-/view?usp=share_link" />
						<DownloadSection title="EPUB" description="For others" href="https://drive.google.com/file/d/1sP2SlvodoWlWpWYRTsankluJW2eOmCNd/view?usp=share_link" />
					</div>
				</section>

				<TableOfContents {...{ebook}} />
			</main>

			<Footer />
		</div>
	);
}

export default App;
