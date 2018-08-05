
# notes
// explainshell.com

// View a manual  
$ man find 

### echo
// will initialise and write 'hi' to a file.   
$ echo 'hi' > hello.txt

//will overwrite existing text  
$ echo 'Hello' > hello.txt

//will append to the base of the file on a new  
line  
$ echo 'World' >> hello.txt

### find
//search for a file
$ find images / -iname "\*.png"  
$ find ./ -type d  

### grep
//grep on a file, mark matches with a color, show line number, show context of the match, inside the lib/index,js file  
$ grep --color -n -C 3 "richardrgibson" lib/index.js

### curl
$ curl -iL https://swapi.co/api/people/1 |

$ curl -H "Authorization: Bearer" https://....

$ curl -X POST -H "Content-Type: application/json" -d '{ "score": "10", "winner": "Richard" }' http://... -o output.txt 


### Creating a shell script
$ touch script.sh  
//allow user to execute the file  
$ chmod u+x script.sh

#### Custom Paramaters
$1 will refrence the first param after calling the script, where script.sh contains:  
> echo "Hello $1" 

calling `$ ./script.sh World` Has an output of:  
> Hello World

You can access more params by increasing the  number. e.g. $2 $3 etc 

#### Default Variables
//will show the kernel working directory  
$ $(pwd)

//To see all default variables 
$ env

#### Custom Variables
var=abc   
echo $var  
> abc  

// makes accessable to all child proccesses
$ export var  
// You can also unset it  
$ unset var  



### Adding a script to the PATH
$ cp scipt.sh /usr/local/bin/hello  
$ hello World  
> Hello World
  

### Functions
>add() {  
> echo $(($1 + $2))  
>}  
>
>total=$(add 1 2)
>
>echo "the total is $total"

### Exit Status
// an integer between 0 and 255  
$ echo $?

### Conditionals
> if [[  ]] || [[ ]]; then  
>  ...  
> elif [[  ]]; then   
>  ...  
> else  
>  ...  
> fi  


### Cut
// behaves like split, you set the delimiter, then the fields that you want to keep    
$ ... | cut -d $'\t' -f2  
// splits on a tab, keeps the second field



# look into 
-- head  
-- cut  
