package com.backlog.moviedatabase.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TrieService {
    private TrieNode root;

    public TrieService() {
        root = new TrieNode();
    }

    // Insert a title into the Trie
    public void insert(String title) {
        TrieNode node = root;
        for (char c : title.toLowerCase().toCharArray()) {
            node = node.getChildren().computeIfAbsent(c, k -> new TrieNode());
        }
        node.setEndOfWord(true);
    }

    // Search for words that start with the given prefix
    public List<String> searchPrefix(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toLowerCase().toCharArray()) {
            node = node.getChildren().get(c);
            if (node == null) {
                return new ArrayList<>();
            }
        }
        return collectWords(node, prefix);
    }

    private List<String> collectWords(TrieNode node, String prefix) {
        List<String> words = new ArrayList<>();
        if (node.isEndOfWord()) {
            words.add(prefix);
        }
        for (Character c : node.getChildren().keySet()) {
            words.addAll(collectWords(node.getChildren().get(c), prefix + c));
        }
        return words;
    }

    private static class TrieNode {
        private boolean isEndOfWord;
        private final java.util.Map<Character, TrieNode> children = new java.util.HashMap<>();

        public boolean isEndOfWord() {
            return isEndOfWord;
        }

        public void setEndOfWord(boolean isEndOfWord) {
            this.isEndOfWord = isEndOfWord;
        }

        public java.util.Map<Character, TrieNode> getChildren() {
            return children;
        }
    }
}
