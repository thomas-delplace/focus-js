import cv2 as cv
import rawpy as rp
import numpy as np
import sys

# FROM THE PARENT PROCESS
# get the file fullpath
# get the analysis options
file = open(sys.argv[1], 'rb') #read the image at path passed on argument 2
bpSample = sys.argv[2]  # get the bytesPerSample passed on argument 2
width = sys.argv[3]
height = sys.argv[4]
parameters = sys.argv[5] # parameters of the analysis
f = np.fromfile(file, dtype=np.uint16, count=height*width)
im = f.reshape((height, width))  # notice row, column format
file.close()

# def detectBlur():















def process(file, israw):
    if israw:
        #analyze with rawpy
        image = rp.imread(file)
        #turn to grayscale
        #analyze blur
        print("picture is a raw image format")
        
 