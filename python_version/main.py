import os
from PyPDF2 import PdfMerger

# Directory containing the PDF files
media_directory = "media"

# Create a PdfMerger object
merger = PdfMerger()

# Get a list of all PDF files in the directory
pdf_files = [os.path.join(media_directory, file) for file in os.listdir(media_directory) if file.endswith(".pdf")]

# Sort the files alphabetically (optional, for consistent order)
pdf_files.sort()

# Add each PDF to the merger
for pdf in pdf_files:
    merger.append(pdf)

# Output file path
output_file = os.path.join(media_directory, "merged_output.pdf")

# Write out the merged PDF
merger.write(output_file)
merger.close()

print(f"PDFs have been merged and saved to {output_file}")
