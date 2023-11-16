function resizeSVG(svg){
    s = scale.toFixed(2);
    svg.style.transform = 'scale(' + s +")";


    console.log("s",s, topSVG, leftSVG)

    offset_x = widthSVG*(s-1)
    offset_y = heightSVG*(s-1)

    svg.style.left = leftSVG +offset_x/2;
    svg.style.top =  topSVG  +offset_y/2;
}