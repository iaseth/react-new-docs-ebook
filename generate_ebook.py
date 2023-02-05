from pyreactorg import ReactOrgApp


def main():
	app = ReactOrgApp()
	app.print()
	app.produce_ebook()
	app.produce_meta_json("reactapp/src/ebook.json")

if __name__ == '__main__':
	main()
