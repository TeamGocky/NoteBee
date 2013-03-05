PDFS=report.pdf
BDIR=./bin

all: $(PDFS)

$(PDFS): %.pdf:%.tex
	pdflatex -output-directory=$(BDIR) $<
	pdflatex -output-directory=$(BDIR) $<

clean:
	rm -rf $(BDIR)/
