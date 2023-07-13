<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:clm54217="urn:un:unece:uncefact:codelist:specification:54217:2001" xmlns:clm5639="urn:un:unece:uncefact:codelist:specification:5639:1988" xmlns:clm66411="urn:un:unece:uncefact:codelist:specification:66411:2001" xmlns:clmIANAMIMEMediaType="urn:un:unece:uncefact:codelist:specification:IANAMIMEMediaType:2003" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:link="http://www.xbrl.org/2003/linkbase" xmlns:n1="urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns:xbrldi="http://xbrl.org/2006/xbrldi" xmlns:xbrli="http://www.xbrl.org/2003/instance" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0" exclude-result-prefixes="cac cbc ccts clm54217 clm5639 clm66411 clmIANAMIMEMediaType fn link n1 qdt udt xbrldi xbrli xdt xlink xs xsd xsi">
<xsl:character-map name="a">
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
<xsl:output-character character="" string=""/>
</xsl:character-map>
<xsl:decimal-format name="european" decimal-separator="," grouping-separator="." NaN=""/>
<xsl:output version="4.0" method="html" indent="no" encoding="UTF-8" doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd" use-character-maps="a"/>
<xsl:param name="SV_OutputFormat" select="'HTML'"/>
<xsl:variable name="XML" select="/"/>
<xsl:template match="/">
<html>
<head>
<script type="text/javascript">
<![CDATA[ var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}(); ]]>
</script>
<style type="text/css"> body { background-color: #FFFFFF; font-family: 'Tahoma', "Times New Roman", Times, serif; font-size: 11px; color: #666666; } h1, h2 { padding-bottom: 3px; padding-top: 3px; margin-bottom: 5px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; } h1 { font-size: 1.4em; text-transform:none; } h2 { font-size: 1em; color: brown; } h3 { font-size: 1em; color: #333333; text-align: justify; margin: 0; padding: 0; } h4 { font-size: 1.1em; font-style: bold; font-family: Arial, Helvetica, sans-serif; color: #000000; margin: 0; padding: 0; } hr { height:2px; color: #000000; background-color: #000000; border-bottom: 1px solid #000000; } p, ul, ol { margin-top: 1.5em; } ul, ol { margin-left: 3em; } blockquote { margin-left: 3em; margin-right: 3em; font-style: italic; } a { text-decoration: none; color: #70A300; } a:hover { border: none; color: #70A300; } #despatchTable { border-collapse:collapse; font-size:11px; float:right; border-color:gray; } #ettnTable { border-collapse:collapse; font-size:11px; border-color:gray; } #customerPartyTable { border-width: 0px; border-spacing:; border-style: inset; border-color: gray; border-collapse: collapse; background-color: } #customerIDTable { border-width: 2px; border-spacing:; border-style: inset; border-color: gray; border-collapse: collapse; background-color: } #customerIDTableTd { border-width: 2px; border-spacing:; border-style: inset; border-color: gray; border-collapse: collapse; background-color: } #lineTable { border-width:2px; border-spacing:; border-style: inset; border-color: black; border-collapse: collapse; background-color:; } td.lineTableTd { border-width: 1px; padding: 1px; border-style: inset; border-color: black; background-color: white; } tr.lineTableTr { border-width: 1px; padding: 0px; border-style: inset; border-color: black; background-color: white; -moz-border-radius:; } #lineTableDummyTd { border-width: 1px; border-color:white; padding: 1px; border-style: inset; border-color: black; background-color: white; } td.lineTableBudgetTd { border-width: 2px; border-spacing:0px; padding: 1px; border-style: inset; border-color: black; background-color: white; -moz-border-radius:; } #notesTable { border-width: 2px; border-spacing:; border-style: inset; border-color: black; border-collapse: collapse; background-color: } #notesTableTd { border-width: 0px; border-spacing:; border-style: inset; border-color: black; border-collapse: collapse; background-color: ; vertical-align: top; } table { border-spacing:0px; } #budgetContainerTable { border-width: 0px; border-spacing: 0px; border-style: inset; border-color: black; border-collapse: collapse; background-color:; } td { border-color:gray; }</style>
<title>e-İrsaliye</title>
</head>
<body style="margin-left=0.6in; margin-right=0.6in; margin-top=0.79in; margin-bottom=0.79in">
<xsl:for-each select="$XML">
<table style="border-color:blue; " border="0" cellspacing="0px" width="800" cellpadding="0px">
<tbody>
<tr valign="top">
<td width="40%">
<br/>
<hr/>
<table align="center" border="0" width="100%">
<tbody>
<tr align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party">
<td align="left">
<xsl:if test="cac:PartyName">
<xsl:value-of select="cac:PartyName/cbc:Name"/>
<br/>
</xsl:if>
</td>
</xsl:for-each>
</tr>
<tr align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party">
<td align="left">
<xsl:for-each select="cac:PostalAddress">
<xsl:for-each select="cbc:StreetName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:BuildingName">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:if test="cbc:BuildingNumber">
<xsl:text> No:</xsl:text>
<xsl:for-each select="cbc:BuildingNumber">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:text> </xsl:text>
</xsl:if>
<br/>
<xsl:for-each select="cbc:PostalZone">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:CitySubdivisionName">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:text>/ </xsl:text>
<xsl:for-each select="cbc:CityName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
</xsl:for-each>
</td>
</xsl:for-each>
</tr>
<xsl:if test="//n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party/cac:Contact/cbc:Telephone or //n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party/cac:Contact/cbc:Telefax">
<tr align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party">
<td align="left">
<xsl:for-each select="cac:Contact">
<xsl:if test="cbc:Telephone">
<xsl:text>Tel: </xsl:text>
<xsl:for-each select="cbc:Telephone">
<xsl:apply-templates/>
</xsl:for-each>
</xsl:if>
<xsl:if test="cbc:Telefax">
<xsl:text> Fax: </xsl:text>
<xsl:for-each select="cbc:Telefax">
<xsl:apply-templates/>
</xsl:for-each>
</xsl:if>
<xsl:text> </xsl:text>
</xsl:for-each>
</td>
</xsl:for-each>
</tr>
</xsl:if>
<xsl:for-each select="//n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party/cbc:WebsiteURI">
<tr align="left">
<td>
<xsl:text>Web Sitesi: </xsl:text>
<xsl:value-of select="."/>
</td>
</tr>
</xsl:for-each>
<xsl:for-each select="//n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail">
<tr align="left">
<td>
<xsl:text>E-Posta: </xsl:text>
<xsl:value-of select="."/>
</td>
</tr>
</xsl:for-each>
<tr align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party">
<td align="left">
<xsl:text>Vergi Dairesi: </xsl:text>
<xsl:for-each select="cac:PartyTaxScheme">
<xsl:for-each select="cac:TaxScheme">
<xsl:for-each select="cbc:Name">
<xsl:apply-templates/>
</xsl:for-each>
</xsl:for-each>
<xsl:text>  </xsl:text>
</xsl:for-each>
</td>
</xsl:for-each>
</tr>
<xsl:for-each select="//n1:DespatchAdvice/cac:DespatchSupplierParty/cac:Party/cac:PartyIdentification">
<tr align="left">
<td>
<xsl:value-of select="cbc:ID/@schemeID"/>
<xsl:text>: </xsl:text>
<xsl:value-of select="cbc:ID"/>
</td>
</tr>
</xsl:for-each>
</tbody>
</table>
<hr/>
</td>
<td width="20%" align="center" valign="middle">
<br/>
<br/>
<img style="width:91px;" align="middle" alt="E-Fatura Logo" src="data:image/jpeg;base64,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"/>
<h1 align="center">
<span style="font-weight:bold; ">
<xsl:text>e-İRSALİYE</xsl:text>
</span>
</h1>
<div class="imgBox" valign="middle">
<img style="width:0px;"/>
</div>
</td>
<td width="300" align="center" valign="middle">
<img style="width:220px;" align="right" alt="Company Logo" src="data:image/jpeg;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2LV31CqjKAzDWwNa2FhYi+gExBSZwJmB8daIlWAnKJ4RBAvBNpBBhLRpMpwUObDHkDacn1yKrMXeWc8zipePDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAm+ytt/1qcG+errf9aQR6sl5oADxIX/u28wb35mXftmkE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"/>
<br/>
</td>
<td width="40%"/>
<td width="20%">
<div id="qrcode" style="width:1px; height:1px;"/>
<div id="qrvalue" style="visibility: hidden">
<xsl:value-of select="n1:DespatchAdvice/cbc:UUID"/>
</div>
<script type="text/javascript"> var qrcode = new QRCode(document.getElementById("qrcode"), { width : 100, height : 100 }); function makeCode (msg) { var elText = document.getElementById("text"); qrcode.makeCode(msg); } makeCode(document.getElementById("qrvalue").innerHTML); </script>
</td>
</tr>
<tr style="height:118px; " valign="top">
<td width="40%" align="right" valign="bottom">
<table id="customerPartyTable" align="left" border="0">
<tbody>
<tr style="height:71px; ">
<td>
<hr/>
<table align="center" border="0">
<tbody>
<tr>
<xsl:for-each select="n1:DespatchAdvice/cac:DeliveryCustomerParty/cac:Party">
<td style="width:469px; " align="left">
<span style="font-weight:bold; ">
<xsl:text>SAYIN</xsl:text>
</span>
</td>
</xsl:for-each>
</tr>
<tr>
<xsl:choose>
<xsl:when test="n1:DespatchAdvice/cac:BuyerCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[@schemeID='PARTYTYPE' and text()='TAXFREE']">
<xsl:for-each select="n1:DespatchAdvice/cac:BuyerCustomerParty/cac:Party">
<xsl:call-template name="Party_Title">
<xsl:with-param name="PartyType">TAXFREE</xsl:with-param>
</xsl:call-template>
</xsl:for-each>
</xsl:when>
<xsl:otherwise>
<xsl:for-each select="n1:DespatchAdvice/cac:DeliveryCustomerParty/cac:Party">
<xsl:call-template name="Party_Title">
<xsl:with-param name="PartyType">OTHER</xsl:with-param>
</xsl:call-template>
</xsl:for-each>
</xsl:otherwise>
</xsl:choose>
</tr>
<xsl:choose>
<xsl:when test="n1:DespatchAdvice/cac:BuyerCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[@schemeID='PARTYTYPE' and text()='TAXFREE']">
<xsl:for-each select="n1:DespatchAdvice/cac:BuyerCustomerParty/cac:Party">
<tr>
<xsl:call-template name="Party_Adress">
<xsl:with-param name="PartyType">TAXFREE</xsl:with-param>
</xsl:call-template>
</tr>
<xsl:call-template name="Party_Other">
<xsl:with-param name="PartyType">TAXFREE</xsl:with-param>
</xsl:call-template>
</xsl:for-each>
</xsl:when>
<xsl:otherwise>
<xsl:for-each select="n1:DespatchAdvice/cac:DeliveryCustomerParty/cac:Party">
<tr>
<xsl:call-template name="Party_Adress">
<xsl:with-param name="PartyType">OTHER</xsl:with-param>
</xsl:call-template>
</tr>
<xsl:call-template name="Party_Other">
<xsl:with-param name="PartyType">OTHER</xsl:with-param>
</xsl:call-template>
</xsl:for-each>
</xsl:otherwise>
</xsl:choose>
</tbody>
</table>
<hr/>
</td>
</tr>
</tbody>
</table>
<br/>
</td>
<td width="60%" align="center" valign="bottom" colspan="2">
<table border="1" id="despatchTable">
<tbody>
<tr>
<td style="width:105px;" align="left">
<span style="font-weight:bold; ">
<xsl:text>Özelleştirme No:</xsl:text>
</span>
</td>
<td style="width:110px;" align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:CustomizationID">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>Senaryo:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:ProfileID">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>İrsaliye Tipi:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:DespatchAdviceTypeCode">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>İrsaliye No:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:ID">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>İrsaliye Tarihi:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:IssueDate">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>İrsaliye Zamanı:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cbc:IssueTime">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>Sevk Tarihi:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:Shipment/cac:Delivery/cac:Despatch/cbc:ActualDespatchDate">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
</tr>
<tr style="height:13px; ">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>Sevk Zamanı:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:Shipment/cac:Delivery/cac:Despatch/cbc:ActualDespatchTime">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
</tr>
<xsl:if test="n1:DespatchAdvice/cac:OrderReference">
<tr style="height:13px">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>Sipariş No:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:OrderReference/cbc:ID">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
</xsl:if>
<xsl:if test="n1:DespatchAdvice/cac:OrderReference/cbc:IssueDate">
<tr style="height:13px">
<td align="left">
<span style="font-weight:bold; ">
<xsl:text>Sipariş Tarihi:</xsl:text>
</span>
</td>
<td align="left">
<xsl:for-each select="n1:DespatchAdvice/cac:OrderReference/cbc:IssueDate">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
</tr>
</xsl:if>
</tbody>
</table>
</td>
</tr>
<xsl:if test="n1:DespatchAdvice/cac:Shipment/cac:Delivery/cac:DeliveryAddress">
<tr align="left">
<table>
<tr>
<td style="width:469px; " align="left">
<span style="font-weight:bold;">
<xsl:text>Teslimat Adresi</xsl:text>
</span>
</td>
</tr>
<tr>
<xsl:for-each select="n1:DespatchAdvice/cac:Shipment/cac:Delivery">
<td align="left">
<xsl:for-each select="cac:DeliveryAddress">
<xsl:for-each select="cbc:StreetName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:BuildingName">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:if test="cbc:BuildingNumber">
<xsl:text> No:</xsl:text>
<xsl:for-each select="cbc:BuildingNumber">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:text> </xsl:text>
</xsl:if>
<br/>
<xsl:for-each select="cbc:PostalZone">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:CitySubdivisionName">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:text>/ </xsl:text>
<xsl:for-each select="cbc:CityName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
</xsl:for-each>
</td>
</xsl:for-each>
</tr>
</table>
</tr>
</xsl:if>
<br/>
<tr align="left">
<td align="left" valign="top" id="ettnTable">
<span style="font-weight:bold; ">
<xsl:text>ETTN: </xsl:text>
</span>
<xsl:for-each select="n1:DespatchAdvice/cbc:UUID">
<xsl:apply-templates/>
</xsl:for-each>
</td>
</tr>
</tbody>
</table>
<div id="lineTableAligner">
<span>
<xsl:text> </xsl:text>
</span>
</div>
<table border="1" id="lineTable" width="800">
<tbody>
<tr class="lineTableTr">
<td class="lineTableTd" style="width:5%" align="center">
<span style="font-weight:bold;">
<xsl:text>Sıra No</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:10%" align="center">
<span style="font-weight:bold;">
<xsl:text>Stok Kodu</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:30%" align="center">
<span style="font-weight:bold;">
<xsl:text>Mal</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:10%" align="center">
<span style="font-weight:bold;">
<xsl:text>Miktar</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:10%" align="center">
<span style="font-weight:bold;">
<xsl:text>Birim Fiyat</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:20%" align="center">
<span style="font-weight:bold;">
<xsl:text>Sonra Gönderilecek Miktar</xsl:text>
</span>
</td>
<td class="lineTableTd" style="width:15%" align="center">
<span style="font-weight:bold;">
<xsl:text>Tutar</xsl:text>
</span>
</td>
</tr>
<xsl:for-each select="//n1:DespatchAdvice/cac:DespatchLine">
<xsl:apply-templates select="."/>
</xsl:for-each>
</tbody>
</table>
</xsl:for-each>
<table id="budgetContainerTable" width="800px">
<tr align="right">
<td/>
<td class="lineTableBudgetTd" align="right" width="156px">
<span style="font-weight:bold; ">
<xsl:text>Toplam Tutar</xsl:text>
</span>
</td>
<td class="lineTableBudgetTd" style="width:156px; " align="right">
<xsl:for-each select="n1:DespatchAdvice/cac:Shipment/cac:GoodsItem/cbc:ValueAmount">
<xsl:call-template name="Curr_Type"/>
</xsl:for-each>
</td>
</tr>
</table>
<br/>
<xsl:if test="//n1:DespatchAdvice/cac:AdditionalDocumentReference">
<table id="lineTable" width="800">
<thead>
<tr>
<td align="left">
<span style="font-weight:bold; " align="center">     İlgili Dokümanlar</span>
</td>
<td align="left">
<span style="font-weight:bold; " align="center">     </span>
</td>
<td align="left">
<span style="font-weight:bold; " align="center">     </span>
</td>
<td align="left">
<span style="font-weight:bold; " align="center">     </span>
</td>
</tr>
</thead>
<tbody>
<tr align="left" class="lineTableTr">
<td class="lineTableTd">
<span style="font-weight:bold; " align="center">     Doküman No</span>
</td>
<td class="lineTableTd">
<span style="font-weight:bold; " align="center">     Tarih</span>
</td>
<td class="lineTableTd">
<span style="font-weight:bold; " align="center">     Doküman Tipi</span>
</td>
<td class="lineTableTd">
<span style="font-weight:bold; " align="center">     Açıklama</span>
</td>
</tr>
<xsl:for-each select="//n1:DespatchAdvice/cac:AdditionalDocumentReference">
<tr align="left" class="lineTableTr">
<td class="lineTableTd">
     
<xsl:value-of select="./cbc:ID"/>
</td>
<td class="lineTableTd">
     
<xsl:for-each select="./cbc:IssueDate">
<xsl:apply-templates select="."/>
</xsl:for-each>
</td>
<td class="lineTableTd">
     
<xsl:value-of select="./cbc:DocumentType"/>
</td>
<td class="lineTableTd">
     
<xsl:value-of select="./cbc:DocumentDescription"/>
</td>
</tr>
</xsl:for-each>
</tbody>
</table>
</xsl:if>
<br/>
<table id="notesTable" width="800">
<thead>
<tr>
<td align="left">
<span style="font-weight:bold; " align="center">     Açıklamalar</span>
</td>
<td align="left">
<span style="font-weight:bold; " align="center">     Taşıyıcı Bilgileri</span>
</td>
</tr>
</thead>
<tbody>
<tr align="left">
<td id="notesTableTd" height="100">
<xsl:for-each select="//n1:DespatchAdvice/cbc:Note">
<b>      Not: </b>
<xsl:value-of select="."/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:SellerSupplierParty">
<b>      Asıl Satıcı VKN: </b>
<xsl:value-of select="cac:Party/cac:PartyIdentification/cbc:ID"/>
<br/>
<b>      Asıl Satıcı Ünvan: </b>
<xsl:value-of select="cac:Party/cac:PartyName/cbc:Name"/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:BuyerCustomerParty">
<b>      Asıl Alıcı VKN: </b>
<xsl:value-of select="cac:Party/cac:PartyIdentification/cbc:ID"/>
<br/>
<b>      Asıl Alıcı Ünvan: </b>
<xsl:value-of select="cac:Party/cac:PartyName/cbc:Name"/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:OriginatorCustomerParty">
<b>      İşlemleri Başlatan Alıcı VKN: </b>
<xsl:value-of select="cac:Party/cac:PartyIdentification/cbc:ID"/>
<br/>
<b>      İşlemleri Başlatan Alıcı Ünvan: </b>
<xsl:value-of select="cac:Party/cac:PartyName/cbc:Name"/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:DespatchSupplierParty/cac:Party/cac:Person">
<xsl:if test="cbc:FirstName">
<b>      Teslim Eden: </b>
<xsl:for-each select="cbc:Title">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FirstName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:MiddleName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FamilyName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:NameSuffix">
<xsl:apply-templates/>
</xsl:for-each>
<br/>
</xsl:if>
</xsl:for-each>
</td>
<td id="notesTableTd" height="100">
<xsl:for-each select="//cac:CarrierParty">
<b>       Taşıyıcı Firma: </b>
VKN:
<xsl:value-of select="./cac:PartyIdentification/cbc:ID"/>
,
<xsl:value-of select="./cac:PartyName/cbc:Name"/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:ShipmentStage/cac:TransportMeans/cac:RoadTransport/cbc:LicensePlateID">
<b>       Araç plaka numarası: </b>
<xsl:value-of select="."/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:TransportHandlingUnit/cac:TransportEquipment/cbc:ID[@schemeID = 'DORSEPLAKA']">
<b>       Dorse plaka numarası: </b>
<xsl:value-of select="."/>
<br/>
</xsl:for-each>
<xsl:for-each select="//cac:ShipmentStage/cac:DriverPerson">
<xsl:if test="cbc:FirstName">
<b>       Şoför: </b>
<xsl:for-each select="cbc:Title">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FirstName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:MiddleName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FamilyName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
, TCKN:
<xsl:for-each select="cbc:NationalityID">
<xsl:apply-templates/>
</xsl:for-each>
<br/>
</xsl:if>
</xsl:for-each>
</td>
</tr>
</tbody>
</table>
</body>
</html>
</xsl:template>
<xsl:template match="//n1:DespatchAdvice/cac:DespatchLine">
<tr class="lineTableTr">
<td class="lineTableTd">
<xsl:text> </xsl:text>
<xsl:value-of select="./cbc:ID"/>
</td>
<td class="lineTableTd">
<xsl:text> </xsl:text>
<xsl:value-of select="./cac:Item/cac:SellersItemIdentification/cbc:ID"/>
</td>
<td class="lineTableTd">
<xsl:text> </xsl:text>
<xsl:value-of select="./cac:Item/cbc:Name"/>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
<xsl:value-of select="format-number(./cbc:DeliveredQuantity, '###.###,####', 'european')"/>
<xsl:if test="./cbc:DeliveredQuantity/@unitCode">
<xsl:for-each select="./cbc:DeliveredQuantity">
<xsl:text> </xsl:text>
<xsl:choose>
<xsl:when test="@unitCode = 'TNE'">
<span>
<xsl:text>Ton</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'BX'">
<span>
<xsl:text>Kutu</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'LTR'">
<span>
<xsl:text>LT</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'C62'">
<span>
<xsl:text>Adet</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'DAA'">
<span>
<xsl:text>Dekar</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KGM'">
<span>
<xsl:text>KG</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'HAR'">
<span>
<xsl:text>Hektar</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KJO'">
<span>
<xsl:text>kJ</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GRM'">
<span>
<xsl:text>G</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MGM'">
<span>
<xsl:text>MG</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'NT'">
<span>
<xsl:text>Net Ton</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GT'">
<span>
<xsl:text>GT</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MTR'">
<span>
<xsl:text>M</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MMT'">
<span>
<xsl:text>MM</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KMT'">
<span>
<xsl:text>KM</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MLT'">
<span>
<xsl:text>ML</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MMQ'">
<span>
<xsl:text>MM3</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CLT'">
<span>
<xsl:text>CL</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CMK'">
<span>
<xsl:text>CM2</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CMQ'">
<span>
<xsl:text>CM3</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CMT'">
<span>
<xsl:text>CM</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MTK'">
<span>
<xsl:text>M2</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MTQ'">
<span>
<xsl:text>M3</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'DAY'">
<span>
<xsl:text>Gün</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MON'">
<span>
<xsl:text>Ay</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'ANN'">
<span>
<xsl:text>Yıl</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'HUR'">
<span>
<xsl:text>Saat</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D61'">
<span>
<xsl:text>Dakika</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D62'">
<span>
<xsl:text>Saniye</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'PA'">
<span>
<xsl:text>Paket</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'R9'">
<span>
<xsl:text>1000 m3</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KWH'">
<span>
<xsl:text>KWH</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GMS'">
<span>
<xsl:text>Gümüs</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CTM'">
<span>
<xsl:text>Karat</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'ANN'">
<span>
<xsl:text>Yıl</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'HUR'">
<span>
<xsl:text>Saat</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MIN'">
<span>
<xsl:text>Dakika</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'SEC'">
<span>
<xsl:text>Saniye</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'LPA'">
<span>
<xsl:text>saf alkol lt</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'BG'">
<span>
<xsl:text>Torba</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'PR'">
<span>
<xsl:text>Adet-Çift</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'DZN'">
<span>
<xsl:text>Düzine</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'SET'">
<span>
<xsl:text>Set</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'NPL'">
<span>
<xsl:text>Koli</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'FTK'">
<span>
<xsl:text>Ayak kare</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'FOT'">
<span>
<xsl:text>Ayak</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'AFF'">
<span>
<xsl:text>AFİF birim fiyatı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'AKQ'">
<span>
<xsl:text>ATV Birim Fiyatı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'AYR'">
<span>
<xsl:text>Altın ayarı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'B32'">
<span>
<xsl:text>KG-METRE kare</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'BAS'">
<span>
<xsl:text>Bas</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CCT'">
<span>
<xsl:text>Ton başı taşıma</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D30'">
<span>
<xsl:text>Brüt Kalori değeri</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D40'">
<span>
<xsl:text>Bin Litre</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'CEN'">
<span>
<xsl:text>Yüz adet</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'T3'">
<span>
<xsl:text>Bin adet</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'OTB'">
<span>
<xsl:text>OTV birim fiyatı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'OMV'">
<span>
<xsl:text>OTV Maktu Vergi</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D97'">
<span>
<xsl:text>Palet</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MLT'">
<span>
<xsl:text>Mililitre</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MGM'">
<span>
<xsl:text>Miligram</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GRM'">
<span>
<xsl:text>Gram</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KGM'">
<span>
<xsl:text>Kilogram</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GFI'">
<span>
<xsl:text>Fıssıle İzotop Gramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KUR'">
<span>
<xsl:text>Uranyum Kilogramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KSH'">
<span>
<xsl:text>Sodyum Hidroksit Kilogramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KSD'">
<span>
<xsl:text>%90 Kuru Ürün Kilogramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KPR'">
<span>
<xsl:text>Kilogram-Çift</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KPH'">
<span>
<xsl:text>Kg Potasyum Oksid</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KFO'">
<span>
<xsl:text>Difosfor Pentaoksit Kilogramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'K62'">
<span>
<xsl:text>Kilogram-Adet</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'K58'">
<span>
<xsl:text>Kurutulmuş Net Ağırlıklı Kilogramı</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'K20'">
<span>
<xsl:text>Kilogram Potasyum Oksit</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'LO'">
<span>
<xsl:text>Lot</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KMA'">
<span>
<xsl:text>METİL AMİNLERİN KİLOGRAMI</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KNI'">
<span>
<xsl:text>AZOTUN KİLOGRAMI</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'D32'">
<span>
<xsl:text>TERAWATT SAAT</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'GWH'">
<span>
<xsl:text>GİGAWATT SAAT</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'MWH'">
<span>
<xsl:text>MEGAWATT SAAT </xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'KWT'">
<span>
<xsl:text>KİLOWATT </xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'DMK'">
<span>
<xsl:text>DESİMETRE KARE</xsl:text>
</span>
</xsl:when>
<xsl:when test="@unitCode = 'SM3'">
<span>
<xsl:text>STANDART METREKÜP</xsl:text>
</span>
</xsl:when>
</xsl:choose>
</xsl:for-each>
</xsl:if>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
<xsl:value-of select="format-number(./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount, '###.##0,########', 'european')"/>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID">
<xsl:text> </xsl:text>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID = "TRL" or ./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID = "TRY"">
<xsl:text>TL</xsl:text>
</xsl:if>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID != "TRL" and ./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID != "TRY"">
<xsl:value-of select="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cac:Price/cbc:PriceAmount/@currencyID"/>
</xsl:if>
</xsl:if>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
<xsl:value-of select="format-number(./cbc:OutstandingQuantity, '###.###,####', 'european')"/>
<xsl:if test="./cbc:OutstandingQuantity/@unitCode">
<xsl:for-each select="./cbc:OutstandingQuantity">
<xsl:text> </xsl:text>
<xsl:choose>
<xsl:when test="@unitCode = '26'">
<xsl:text>ton</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'BX'">
<xsl:text>Kutu</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'LTR'">
<xsl:text>lt</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'C62'">
<xsl:text>Adet</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'NIU'">
<xsl:text>Adet</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'KGM'">
<xsl:text>kg</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'KJO'">
<xsl:text>kJ</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'GRM'">
<xsl:text>g</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MGM'">
<xsl:text>mg</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'NT'">
<xsl:text>Net Ton</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'GT'">
<xsl:text>Gross Ton</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MTR'">
<xsl:text>m</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MMT'">
<xsl:text>mm</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'KTM'">
<xsl:text>km</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MLT'">
<xsl:text>ml</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MMQ'">
<xsl:text>mm3</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'CLT'">
<xsl:text>cl</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'CMK'">
<xsl:text>cm2</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'CMQ'">
<xsl:text>cm3</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'CMT'">
<xsl:text>cm</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MTK'">
<xsl:text>m2</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MTQ'">
<xsl:text>m3</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'DAY'">
<xsl:text> Gün</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'MON'">
<xsl:text> Ay</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'PA'">
<xsl:text> Paket</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'KWH'">
<xsl:text> KWH</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'ANN'">
<xsl:text> Yıl</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'HUR'">
<xsl:text> Saat</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'D61'">
<xsl:text> Dakika</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'D62'">
<xsl:text> Saniye</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'CCT'">
<xsl:text> Ton baş.taşıma kap.</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'D30'">
<xsl:text> Brüt kalori</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'D40'">
<xsl:text> 1000 lt</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'LPA'">
<xsl:text> saf alkol lt</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'B32'">
<xsl:text> kg.m2</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'NCL'">
<xsl:text> hücre adet</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'PR'">
<xsl:text> Çift</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'R9'">
<xsl:text> 1000 m3</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'SET'">
<xsl:text> Set</xsl:text>
</xsl:when>
<xsl:when test="@unitCode = 'T3'">
<xsl:text> 1000 adet</xsl:text>
</xsl:when>
</xsl:choose>
</xsl:for-each>
</xsl:if>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
<xsl:value-of select="format-number(./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount, '###.##0,########', 'european')"/>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID">
<xsl:text> </xsl:text>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID = "TRL" or ./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID = "TRY"">
<xsl:text>TL</xsl:text>
</xsl:if>
<xsl:if test="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID != "TRL" and ./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID != "TRY"">
<xsl:value-of select="./cac:Shipment/cac:GoodsItem/cac:InvoiceLine/cbc:LineExtensionAmount/@currencyID"/>
</xsl:if>
</xsl:if>
</td>
</tr>
</xsl:template>
<xsl:template match="//cbc:IssueDate">
<xsl:value-of select="substring(.,9,2)"/>
-
<xsl:value-of select="substring(.,6,2)"/>
-
<xsl:value-of select="substring(.,1,4)"/>
</xsl:template>
<xsl:template match="//cbc:ActualDespatchDate">
<xsl:value-of select="substring(.,9,2)"/>
-
<xsl:value-of select="substring(.,6,2)"/>
-
<xsl:value-of select="substring(.,1,4)"/>
</xsl:template>
<xsl:template match="//n1:DespatchAdvice">
<tr class="lineTableTr">
<td class="lineTableTd">
<xsl:text> </xsl:text>
</td>
<td class="lineTableTd">
<xsl:text> </xsl:text>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
</td>
<td class="lineTableTd" align="right">
<xsl:text> </xsl:text>
</td>
</tr>
</xsl:template>
<xsl:template name="Party_Title">
<xsl:param name="PartyType"/>
<td style="width:469px; " align="left">
<xsl:if test="cac:PartyName">
<xsl:value-of select="cac:PartyName/cbc:Name"/>
<br/>
</xsl:if>
<xsl:for-each select="cac:Person">
<xsl:for-each select="cbc:Title">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FirstName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:MiddleName">
<xsl:apply-templates/>
<xsl:text>  </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:FamilyName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:NameSuffix">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:if test="$PartyType='TAXFREE'">
<br/>
<xsl:text>Pasaport No: </xsl:text>
<xsl:value-of select="cac:IdentityDocumentReference/cbc:ID"/>
<br/>
<xsl:text>Ülkesi: </xsl:text>
<xsl:value-of select="cbc:NationalityID"/>
</xsl:if>
</xsl:for-each>
</td>
</xsl:template>
<xsl:template name="Party_Adress">
<xsl:param name="PartyType"/>
<td style="width:469px; " align="left">
<xsl:for-each select="cac:PostalAddress">
<xsl:for-each select="cbc:StreetName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:BuildingName">
<xsl:apply-templates/>
</xsl:for-each>
<xsl:for-each select="cbc:BuildingNumber">
<xsl:text> No:</xsl:text>
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<br/>
<xsl:for-each select="cbc:Room">
<xsl:text>Kapı No:</xsl:text>
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<br/>
<xsl:for-each select="cbc:PostalZone">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:CitySubdivisionName">
<xsl:apply-templates/>
<xsl:text>/ </xsl:text>
</xsl:for-each>
<xsl:for-each select="cbc:CityName">
<xsl:apply-templates/>
<xsl:text> </xsl:text>
</xsl:for-each>
<xsl:if test="$PartyType='TAXFREE'">
<br/>
<xsl:value-of select="cac:Country/cbc:Name"/>
<br/>
</xsl:if>
</xsl:for-each>
</td>
</xsl:template>
<xsl:template name="Party_Other">
<xsl:param name="PartyType"/>
<xsl:for-each select="cbc:WebsiteURI">
<tr align="left">
<td>
<xsl:text>Web Sitesi: </xsl:text>
<xsl:value-of select="."/>
</td>
</tr>
</xsl:for-each>
<xsl:for-each select="cac:Contact/cbc:ElectronicMail">
<tr align="left">
<td>
<xsl:text>E-Posta: </xsl:text>
<xsl:value-of select="."/>
</td>
</tr>
</xsl:for-each>
<xsl:for-each select="cac:Contact">
<xsl:if test="cbc:Telephone or cbc:Telefax">
<tr align="left">
<td style="width:469px; " align="left">
<xsl:for-each select="cbc:Telephone">
<xsl:text>Tel: </xsl:text>
<xsl:apply-templates/>
</xsl:for-each>
<xsl:for-each select="cbc:Telefax">
<xsl:text> Fax: </xsl:text>
<xsl:apply-templates/>
</xsl:for-each>
<xsl:text> </xsl:text>
</td>
</tr>
</xsl:if>
</xsl:for-each>
<xsl:if test="$PartyType!='TAXFREE'">
<xsl:for-each select="cac:PartyTaxScheme/cac:TaxScheme/cbc:Name">
<tr align="left">
<td>
<xsl:text>Vergi Dairesi: </xsl:text>
<xsl:apply-templates/>
</td>
</tr>
</xsl:for-each>
<xsl:for-each select="cac:PartyIdentification">
<tr align="left">
<td>
<xsl:value-of select="cbc:ID/@schemeID"/>
<xsl:text>: </xsl:text>
<xsl:value-of select="cbc:ID"/>
</td>
</tr>
</xsl:for-each>
</xsl:if>
</xsl:template>
<xsl:template name="Curr_Type">
<xsl:value-of select="format-number(., '###.##0,00', 'european')"/>
<xsl:if test="@currencyID">
<xsl:text> </xsl:text>
<xsl:choose>
<xsl:when test="@currencyID = 'TRL' or @currencyID = 'TRY'">
<xsl:text>TL</xsl:text>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="@currencyID"/>
</xsl:otherwise>
</xsl:choose>
</xsl:if>
</xsl:template>
</xsl:stylesheet>