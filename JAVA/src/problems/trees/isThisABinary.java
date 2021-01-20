package problems.trees;
import java.util.*;
import java.io.*;

class isThisABinary {
  public boolean isValidBST(TreeNode root) {
    boolean res = inOrder(root);
    return res;
  }

  ArrayList<Integer> nums = new ArrayList();
  boolean inOrder(TreeNode root) {
    if ( root == null ) {
      return true;
    }
    if (root.left != null) {
      if (!inOrder(root.left)) {
        return false;
      }
    }

    if ( nums.isEmpty() || nums.get(nums.size()-1) < root.val) {
      nums.add(root.val);
    } else {
      return false;
    }
    if ( root.right != null ) {
      if(!inOrder(root.right)){
        return false;
      }
    }
    return true;
  }
}