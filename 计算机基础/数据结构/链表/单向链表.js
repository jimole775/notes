class LinkedList{
    constructor(){
        this.head = new Node("head");
        this.index = 0;
    }

    append(newElement){
        let curNode = new Node(newElement);
        if(!this.head.next){
            this.head.next = curNode;
        }else{
            let nextNode = this.head.next;
            while(nextNode.next){
                nextNode = nextNode.next;
            }
            nextNode.next = curNode;
        }
        curNode.next = null;
        this.index ++;
    }

    insert(position,newElement){
        if(position < 0 || position > this.index){
            return false;
        }
        let loopIndex = 0;
        let curNode = this.head.next;
        while(loopIndex < position){
            curNode = curNode.next;
            loopIndex ++;
        }
        let insertNode = new Node(newElement);
        let nextNode = curNode.next;
        curNode.next = insertNode;
        insertNode.next = nextNode;
        return true;
    }

    remove(posiOrEl){
        let curNode = find(posiOrEl);        
        if(!curNode) return false;
        let nextNode = curNode.next;
        curNode.next = nextNode.next;           
        this.index --;
    }

    find(posiOrEl){
        let result;
        if(posiOrEl instanceof Number){
            result = findByPosition(posiOrEl)
        }else{
            result = findByElement(posiOrEl)
        }
        return result;
    }

    findByPosition(position){
        if(position < 0 || position > this.index){
            return false;
        }
        let curNode = this.head.next;
        let loopIndex = 0;
        while(loopIndex < position){
            curNode = curNode.next;
            loopIndex ++;
        }
        return curNode;
    }

    findByElement(element){
        if(!element) return false;
        let curNode = this.head.next;
        while(curNode && curNode != element){
            curNode = curNode.next;
        }

        return curNode;
    }

    display(){
        let curNode = this.head.next;
        while(curNode.next){
            console.info(curNode.element);
            curNode = curNode.next;
        };
    }
}
class Node{
   constructor(el){
       this.element = el;
       this.next = null;
   }
}
