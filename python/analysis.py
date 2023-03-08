import detect_blur as blur
import sys
import cv2 as cv

# FROM THE PARENT PROCESS
# get the file fullpath
# get the analysis options
#file = sys.argv[1]
parameters = "F" #sys.argv[2]
file = "../../test_images/max.cr2"

def detectBlur():
    image = cv.imread(file)
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    F = cv.Laplacian(gray, cv.CV_64F).var()
    return F

#
# Set our dict to store the datas that will later be sent to the parent process
#
response = {}

if "F" in parameters:
    response["F"] = detectBlur(file)

print(response["F"])
