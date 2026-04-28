{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	packages = with pkgs; [
		git
		nodejs_20
		nodePackages.nodemon
		nodePackages.serve
	];

	shellHook = ''
		alias gst="git status"
		alias gco="git commit"
		alias glo="git log --oneline"
		alias glog="git log"
		alias gadd="git add --all"
		alias gdif="git diff --staged"
		alias vim=nvim
		echo "dev env ready"
	'';
}

