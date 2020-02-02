**Comment or [make a PR](https://github.com/cpustejovsky/blog-posts/blob/master/soldity.md) if you have any suggestions, criticism, or other feedback**


# Smart Contracts

Smart contracts are accounts on the Ethereum network that don't have private keys like the Ethereum you may own on a wallet. Why would you want to use smart cntracts? I've talked about this [elsewhere](https://bitpay.com/blog/ethereum-crash-course/) if you want to read more.
![](https://bitpay.com/blog/content/images/2019/10/homer-simpson-doughnuts.jpeg)

*mmmmm... smart contracts*

The name however is confusing. According to Andreas Antonopoulos and Gavin Wood
>"Ethereum smart contracts are neither smart nor legal contracts \[but rather are\] immutable computer programs that run deterministically in the context of an Ethereum Virtual Machine as \[EVM\]part of the Ethereum network protocol..."

## Simpler Definition
* Smart contracts cannot be changed once set live. The only way to change them is to set up a new smart contract with those changes.
  * The opcode for this is `SELFDESTRUCT`
* Given the same varibles, a smart contract will run the same way every time. It's **not** random.
* The EVM provides a sandboxed environment: if you have it running on your computer, it can access transaction details and network details, but it can't look at all the memes you have saved on your hard drive.

# How Programs Run, the EVM, and Executing Smart Contracts

There are several ways programs can run. They can be compiled, interpretted, or make use of virtual machines.

## Compiled
Some programming languages like C, C++, and Go are compiled into machine code your processor understands and then are run.

## Interpretted or Just-In-Time(JIT) Compiled
![](https://i.pinimg.com/originals/2c/58/df/2c58df16c09a8b162d324456125b578a.gif)

Other programming languages like JavaScript, Python, and Ruby compile at run-time.

## Virtual Machines and Byte-Code
Java compiles into byte-code that the Java Virtual Machine runs. That's why Java has the tag-line "write once and run anywhere".

**Solidity compiles into EVM byte-code.** This byte-code is then deployed to the Ethereum platform.

You generally run a program by double-clicking it or putting `./` in front of it but smart contracts only run when called by a transaction.


![Diagram of EVM](https://hackernoon.com/hn-images/1*ajksoo8DEQl-COk84HdVvA.png)

# Solidity

You **could** build smart contracts in JavaScript or C++ or Python or something, but because there are specific constraints and contexts related to the EVM, it's easier to build a language specifically for the task.

Currently, Solidity is the most popular language for programming smart contracts. It is an imperative programming language like C++ or Java because as Andreas/Gavin points out, **"Programmers, like most humans, resist change!"**

It uses **semantic versioning**
![](https://digitalcommunications.wp.st-andrews.ac.uk/files/2017/01/semver03.png)

## Example Code

![](https://miro.medium.com/max/4788/1*VpOAbpxTQa-otqtZr38Uhw.jpeg)

I'm new to Solidity, so I used CryptoZombies to learn the basics. This is what I created from Lesson 1:

```solidity
//sets the version of solidity that this smart contract will work with
pragma solidity ^0.4.25;


//fundamental building block of ETH applications
contract ZombieFactory {

    // event declaration
    event NewZombie(uint zombieId, string name, uint dna);

    //uint: unsigned integers (means you know they are positive)
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;


    //like an object in JavaScript, allows for more complex storage of key-value pairs
    struct Zombie {
        string name;
        uint dna;
    }
    //public array that adds Zombie structs
    Zombie[] public zombies;

    //private function; only set functions public if you want to expose them to the world
    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        emit NewZombie(id, _name, _dna);
    } 

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
    //public: means any person or contract can call this function and execute it's code
    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}
```
[Found here](https://ethfiddle.com/7624u67iEd)


# Resources
* [CryptoZombies](https://cryptozombies.io/)
* [Solidity Documentation](https://solidity.readthedocs.io/en/v0.5.13/)
* [EthFiddle](https://ethfiddle.com/)
* [VSCode Setup](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
* [JetBrains Setup](https://plugins.jetbrains.com/plugin/9475-intellij-solidity/versions)
