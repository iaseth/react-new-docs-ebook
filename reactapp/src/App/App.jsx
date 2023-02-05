import './App.scss';
import ebook from '../ebook.json';

import Header from './Header';
import TableOfContents from './TableOfContents';
import Footer from './Footer';



function App () {

	return (
		<div className="">
			<Header />

			<main className="bg-slate-200 text-slate-800">
				<TableOfContents {...{ebook}} />
			</main>

			<Footer />
		</div>
	);
}

export default App;
