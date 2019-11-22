**Title**: Solidity and Smart Contracts
**CONTEXT:** *I'm giving a little talk on Solidity and smart contracts and I suck at PowerPoint so I decided to create a blog post that others can follow along with. That way I can also add in edits as my coworkers correct or expand on what I put in.*

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
```solidity
pragma solidity ^0.4.25;

contract ZombieFactory {

    // declare our event here

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
        // and fire it here
    } 

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}

```
# Resources
* [CryptoZombies](https://cryptozombies.io/)
* [Solidity Documentation](https://solidity.readthedocs.io/en/v0.5.13/)
* [VSCode Setup]()
* [JetBrains Setup]()
