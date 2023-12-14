import JavaScriptObfuscator from "javascript-obfuscator";

export default function obfuscate(Args) {

    var obfuscationResult = JavaScriptObfuscator.obfuscate(
        Args,
        {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
    );

    return obfuscationResult.getObfuscatedCode();
}
