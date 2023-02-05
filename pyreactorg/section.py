from .utils import HtmlBaseclass
from .page import ReactOrgPage


class ReactOrgSection(HtmlBaseclass):
	def __init__(self, app, jo):
		self.app = app
		self.jo = jo
		self.title = self.jo['title']
		self.filepath = f"data/html/{jo['filename']}.html"

		self.pages = []
		for pj in self.jo['pages']:
			page = ReactOrgPage(self, pj)
			self.pages.append(page)
		self.template = self.app.section_page_template.template

	def getIdref(self):
		return f"x_section_{self.index}"

	def get_content_html(self):
		return open(self.filepath).read()

	def __str__(self):
		return f"ReactOrgSection '{self.title}' [{self.length()} pages]"
