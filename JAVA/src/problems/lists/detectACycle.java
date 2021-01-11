package problems.lists;
/*
Detect a cycle in a linked list. Note that the head pointer may be 'null' if the list is empty.
A Node is defined as:
*/

import java.util.Hashtable;
class Node {
        int data;
        Node next;
}

class detectACycle {
  boolean hasCycle(Node head) {
    Hashtable<Node, Boolean> nodesVisited = new Hashtable<Node, Boolean>();
    Node currentNode = head;
    while (currentNode != null) {
      if (nodesVisited.containsKey(currentNode)) {
        return true;
      } else {
        nodesVisited.put(currentNode, true);
      }
      currentNode = currentNode.next;
    }
    return false;
  }
}