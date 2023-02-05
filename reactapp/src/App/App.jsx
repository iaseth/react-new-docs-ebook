import './App.scss';
import ebook from '../ebook.json';


function Page ({page, k}) {
	return (
		<div>
			<h5>Page #{k+1}</h5>
			<h4>{page.title}</h4>
		</div>
	);
}

function Section ({section, k}) {
	const pageItems = section.pages.map((page, k) => <Page key={k} {...{page, k}} />);
	return (
		<section>
			<header className="px-2 py-2">
				<h5>Section #{k+1}</h5>
				<h2>{section.title}</h2>
			</header>

			<main className="px-4 py-2">
				{pageItems}
			</main>
		</section>
	);
}

function App () {
	const {sections} = ebook;
	const sectionItems = sections.map((section, k) => <Section key={k} {...{section, k}} />);

	return (
		<div className="">
			<header className="bg-red-500 text-white px-2 py-3 text-center">
				<h3 className="">React docs for Kindle</h3>
			</header>

			<main>
				<article className="max-w-md mx-auto px-3 py-4">
					<div>{sectionItems}</div>
				</article>
			</main>
		</div>
	);
}

export default App;
